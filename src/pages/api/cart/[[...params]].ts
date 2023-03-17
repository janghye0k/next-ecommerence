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
import { CreateCartDTO, UpdateCartDTO } from '@/server/dto/cart'

@Catch(exceptionHandler)
class CartHandler {
  @Get()
  @AuthGuard()
  public async getCarts(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    const carts = await prisma.cart.findMany({
      where: { userId: session.user.id },
      include: {
        product: { include: { category: true } },
        productInventory: { include: { color: true, size: true } },
      },
    })
    return res.status(200).send({ carts })
  }

  @Post()
  @AuthGuard()
  public async createCart(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    createCartDTO: CreateCartDTO,
  ) {
    const cart = await prisma.cart.create({
      data: { ...createCartDTO, userId: session.user.id },
    })

    return res.status(201).send({ cart })
  }

  @Patch('/:id')
  @AuthGuard()
  public async updateCart(
    @Param('id', ParseNumberPipe) id: number,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    updateCartDTO: UpdateCartDTO,
  ) {
    const { count } = await prisma.cart.updateMany({
      where: { id, userId: session.user.id },
      data: updateCartDTO,
    })

    return res.status(200).send({ count })
  }

  @Delete('/:id')
  @AuthGuard()
  public async deleteCart(
    @Param('id', ParseNumberPipe) id: number,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    await prisma.cart.deleteMany({ where: { userId: session.user.id, id } })
    return res
      .status(200)
      .send({ message: `Successfully delete cart id: ${id}` })
  }
}

export default createHandler(CartHandler)
