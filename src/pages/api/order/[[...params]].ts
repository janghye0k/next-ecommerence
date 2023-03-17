import {
  BadRequestException,
  Body,
  Catch,
  createHandler,
  Delete,
  Get,
  Param,
  ParseNumberPipe,
  Patch,
  Post,
  Res,
  ValidationPipe,
} from 'next-api-decorators'
import prisma from '@/lib/prisma'
import exceptionHandler from '@/server/exception'
import AuthGuard from '@/server/gurad/auth.guard'
import { NextApiResponse } from 'next'
import { GetSession } from '@/server/decorators'
import { NextAuthSession } from '@/types/next-auth'
import {
  CreateOrderDTO,
  CreateOrderItemDTO,
  UpdateOrderDTO,
  UpdateOrderItemDTO,
} from '@/server/dto/order'

@Catch(exceptionHandler)
class OrderHandler {
  @Get()
  @AuthGuard()
  public async getOrders(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        address: true,
        items: {
          include: {
            product: { include: { category: true } },
            productInventory: { include: { color: true, size: true } },
            discount: true,
            review: true,
          },
        },
        payment: true,
      },
    })
    return res.status(200).send({ orders })
  }

  @Get('/item/:orderId')
  @AuthGuard()
  public async getOrderItem(
    @Param('orderId') orderId: string,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    const order = await prisma.order.findFirst({
      where: { userId: session.user.id, id: orderId },
      include: {
        items: {
          include: {
            product: { include: { category: true } },
            productInventory: { include: { color: true, size: true } },
            discount: true,
            review: true,
          },
        },
      },
    })

    return res.status(200).send({ orderItems: order?.items || [] })
  }

  @Post()
  @AuthGuard()
  public async createOrder(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    createOrderDTO: CreateOrderDTO,
  ) {
    const order = await prisma.order.create({
      data: { ...createOrderDTO, userId: session.user.id },
    })
    return res.status(201).send({ order })
  }

  @Post('/item')
  @AuthGuard()
  public async createOrderItem(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    { items, orderId }: CreateOrderItemDTO,
  ) {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: session.user.id },
    })

    if (!order)
      throw new BadRequestException(`Can't find order by id: '${orderId}'`)

    const datas = items.map((item) => {
      return { ...item, orderId }
    })
    const orderItems = await prisma.orderItem.createMany({ data: datas })
    return res.status(201).send({ orderItems })
  }

  @Patch('/item/:id')
  @AuthGuard()
  public async updateOrderItem(
    @Param('id') id: string,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    updateOrderItemDTO: UpdateOrderItemDTO,
  ) {
    await prisma.orderItem.updateMany({
      where: { id, order: { userId: session.user.id } },
      data: updateOrderItemDTO,
    })

    return res.status(200).send({ message: 'Successfully update order item' })
  }

  @Patch('/:id')
  @AuthGuard()
  public async updateOrder(
    @Param('id') id: string,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    updateOrderDTO: UpdateOrderDTO,
  ) {
    await prisma.order.updateMany({
      where: { id, userId: session.user.id },
      data: updateOrderDTO,
    })
    return res.status(200).send({ message: 'Successfully update order' })
  }

  @Delete('/item/:id')
  @AuthGuard()
  public async deleteOrderItem(
    @Param('id') id: string,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    await prisma.orderItem.deleteMany({
      where: { id, order: { userId: session.user.id } },
    })
    return res
      .status(200)
      .send({ message: `Successfully delete order item by id: ${id}` })
  }

  @Delete('/:id')
  @AuthGuard()
  public async deleteOrder(
    @Param('id') id: string,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    await prisma.order.deleteMany({ where: { id, userId: session.user.id } })
    return res
      .status(200)
      .send({ message: `Successfully delete order by id: ${id}` })
  }
}

export default createHandler(OrderHandler)
