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
import prisma, { excludeFields } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import exceptionHandler from '@/server/exception'
import AdminGuard from '@/server/gurad/admin.guard'
import {
  CreateProductDTO,
  ProductInventoryDTO,
  UpdateProductDTO,
} from '@/server/dto/product'

@Catch(exceptionHandler)
class ProductHandler {
  @Get()
  public async getProducts(@Res() res: NextApiResponse) {
    const products = await prisma.product.findMany({
      include: {
        inventory: { include: { color: true } },
        discounts: true,
        category: true,
        reviews: { select: { id: true } },
      },
    })
    return res.status(200).send({
      products,
      message: 'Get products',
    })
  }

  @Get('/:id')
  public async getProduct(
    @Res() res: NextApiResponse,
    @Param('id') id: string,
  ) {
    const product = await prisma.product.findUnique({
      include: {
        inventory: { include: { color: true, size: true } },
        category: true,
        discounts: true,
        reviews: {
          include: {
            user: { select: excludeFields('User', ['pwd']) },
            orderItem: {
              include: {
                productInventory: { include: { color: true, size: true } },
              },
            },
          },
        },
      },
      where: { id },
    })

    return res.status(200).send({
      product,
      message: `Get product by id: ${id}`,
    })
  }

  @Post()
  @AdminGuard()
  public async createProduct(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    productDTO: CreateProductDTO,
  ) {
    const product = await prisma.product.create({ data: productDTO })

    return res
      .status(201)
      .send({ message: 'Successfully create product', product })
  }

  @Post('/inventory')
  @AdminGuard()
  public async createProdctInventory(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    { inventorys }: ProductInventoryDTO,
  ) {
    const productInventorys = await prisma.productInventory.createMany({
      data: inventorys,
    })

    return res.status(201).send({
      message: 'Successfully create product inventory',
      productInventorys,
    })
  }

  @Patch('/inventory/:id')
  @AdminGuard()
  public async updateProductInventory(
    @Param('id', ParseNumberPipe) id: number,
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true }))
    { qty }: { qty: number },
  ) {
    if (!qty || typeof qty !== 'number')
      throw new BadRequestException(
        'qty (number) must be included in request body',
      )
    const productInventory = await prisma.productInventory.update({
      where: { id },
      data: { qty },
    })

    return res.status(200).send({
      message: `Successfully update product inventory id: ${id}`,
      productInventory,
    })
  }

  @Patch('/:id')
  @AdminGuard()
  public async updateProduct(
    @Param('id') id: string,
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    updateProductDTO: UpdateProductDTO,
  ) {
    const product = await prisma.product.update({
      data: updateProductDTO,
      where: { id },
    })

    return res.status(200).send({
      message: `Successfully update product id: ${id}`,
      product,
    })
  }

  @Delete()
  @AdminGuard()
  public async deleteProduct(
    @Res() res: NextApiResponse,
    @Body() { ids }: { ids: string[] },
  ) {
    if (!ids || !Array.isArray(ids))
      throw new BadRequestException(
        `Delete product fail, "ids" must be included in request body`,
      )
    await prisma.product.deleteMany({ where: { id: { in: ids } } })
    return res
      .status(200)
      .send(
        `Successfully delete ${
          ids.length === 1 ? `product id: ${ids[0]}` : `${ids.length} products`
        } `,
      )
  }

  @Delete('/inventory')
  @AdminGuard()
  public async deleteProductInventory(
    @Res() res: NextApiResponse,
    @Body() { ids }: { ids: number[] },
  ) {
    if (!ids || !Array.isArray(ids))
      throw new BadRequestException(
        `Delete product fail, "ids" must be included in request body`,
      )
    await prisma.productInventory.deleteMany({ where: { id: { in: ids } } })
    return res
      .status(200)
      .send(
        `Successfully delete ${
          ids.length === 1
            ? `product inventory id: ${ids[0]}`
            : `${ids.length} product inventorys`
        } `,
      )
  }
}

export default createHandler(ProductHandler)
