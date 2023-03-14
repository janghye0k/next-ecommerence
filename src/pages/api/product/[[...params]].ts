import { createHandler, Get, Param, Post, Req, Res } from 'next-api-decorators'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

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
        reviews: true,
      },
      where: { id },
    })

    return res.status(200).send({
      product,
      message: `Get product by id: ${id}`,
    })
  }

  @Post()
  public async createProduct(@Res() res: NextApiResponse) {
    return res.status(201).send({ message: 'Successfully create product' })
  }
}

export default createHandler(ProductHandler)
