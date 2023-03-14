import {
  Body,
  createHandler,
  Delete,
  Get,
  Param,
  ParseNumberPipe,
  Post,
  Put,
  Res,
  ValidationPipe,
} from 'next-api-decorators'
import prisma from '@/lib/prisma'
import { NextApiResponse } from 'next'
import AdminGuard from '@/server/gurad/admin.guard'
import {
  ColorDTO,
  SizeDTO,
  CategoryDTO,
  DiscountDTO,
} from '@/server/dto/option'

class OptionHandler {
  @Get('/categorys')
  public async getCategorys(@Res() res: NextApiResponse) {
    const categorys = await prisma.category.findMany()
    return res
      .status(200)
      .send({ message: `Find ${categorys.length} categorys`, categorys })
  }

  @Get('/colors')
  public async getColors(@Res() res: NextApiResponse) {
    const colors = await prisma.category.findMany()
    return res
      .status(200)
      .send({ message: `Find ${colors.length} colors`, colors })
  }

  @Get('/sizes')
  public async getSizes(@Res() res: NextApiResponse) {
    const sizes = await prisma.size.findMany()
    return res
      .status(200)
      .send({ message: `Find ${sizes.length} sizes`, sizes })
  }

  @Get('/discounts')
  public async getDiscounts(@Res() res: NextApiResponse) {
    const discounts = await prisma.size.findMany()
    return res
      .status(200)
      .send({ message: `Find ${discounts.length} discounts`, discounts })
  }

  @Post('/category')
  @AdminGuard()
  public async createCategory(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) categoryDTO: CategoryDTO,
  ) {
    const category = await prisma.category.create({
      data: categoryDTO,
    })
    return res.status(201).send({
      category,
      message: `Create Category: ${categoryDTO.fullName}`,
    })
  }

  @Post('/color')
  @AdminGuard()
  public async createColor(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) colorDTO: ColorDTO,
  ) {
    const color = await prisma.color.create({
      data: colorDTO,
    })
    return res.status(201).send({
      color,
      message: `Create Category: ${colorDTO.name}`,
    })
  }

  @Post('/size')
  @AdminGuard()
  public async createSize(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) sizeDTO: SizeDTO,
  ) {
    const size = await prisma.size.create({
      data: sizeDTO,
    })
    return res.status(201).send({
      size,
      message: `Create Size: ${sizeDTO.name}`,
    })
  }

  @Post('/discount')
  @AdminGuard()
  public async createDiscount(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) discountDTO: DiscountDTO,
  ) {
    const { productIds, ...createData } = discountDTO
    const discount = await prisma.discount.create({
      data: {
        ...createData,
        products: {
          connect: productIds.map((id) => {
            return { id }
          }),
        },
      },
    })
    return res.status(201).send({
      discount,
      message: `Create Discount: ${discountDTO.name}`,
    })
  }

  @Put('/category/:id')
  @AdminGuard()
  async updateCategory(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) categoryDTO: CategoryDTO,
    @Param('id', ParseNumberPipe) id: number,
  ) {
    const category = await prisma.category.update({
      data: categoryDTO,
      where: { id },
    })

    return res.status(200).send({
      category,
      message: `Update category: ${category.fullName}`,
    })
  }

  @Put('/color/:id')
  @AdminGuard()
  async updateColor(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) colorDTO: ColorDTO,
    @Param('id', ParseNumberPipe) id: number,
  ) {
    const color = await prisma.color.update({
      data: colorDTO,
      where: { id },
    })

    return res.status(200).send({
      color,
      message: `Update color: ${color.name}`,
    })
  }

  @Put('/size/:id')
  @AdminGuard()
  async updateSize(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) sizeDTO: SizeDTO,
    @Param('id', ParseNumberPipe) id: number,
  ) {
    const size = await prisma.size.update({
      data: sizeDTO,
      where: { id },
    })

    return res.status(200).send({
      size,
      message: `Update size: ${size.name}`,
    })
  }

  @Put('/discount/:id')
  @AdminGuard()
  async updateDiscount(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) discountDTO: DiscountDTO,
    @Param('id', ParseNumberPipe) id: number,
  ) {
    const { productIds, ...discountData } = discountDTO
    const discount = await prisma.discount.update({
      data: {
        ...discountData,
        products: {
          set: productIds.map((pid) => {
            return { id: pid }
          }),
        },
      },
      include: {
        products: true,
      },
      where: { id },
    })

    return res.status(200).send({
      discount,
      message: `Update discount: ${discount.name}`,
    })
  }

  @Delete('/category/:id')
  @AdminGuard()
  async deleteCategory(
    @Res() res: NextApiResponse,
    @Param('id', ParseNumberPipe) id: number,
  ) {
    await prisma.category.delete({ where: { id } })
    return res.status(200).send({ message: 'Category successfuly deleted' })
  }

  @Delete('/color/:id')
  @AdminGuard()
  async deleteColor(
    @Res() res: NextApiResponse,
    @Param('id', ParseNumberPipe) id: number,
  ) {
    await prisma.color.delete({ where: { id } })
    return res.status(200).send({ message: 'Color successfuly deleted' })
  }

  @Delete('/size/:id')
  @AdminGuard()
  async deleteSize(
    @Res() res: NextApiResponse,
    @Param('id', ParseNumberPipe) id: number,
  ) {
    await prisma.size.delete({ where: { id } })
    return res.status(200).send({ message: 'Size successfuly deleted' })
  }

  @Delete('/discount/:id')
  @AdminGuard()
  async deleteDiscount(
    @Res() res: NextApiResponse,
    @Param('id', ParseNumberPipe) id: number,
  ) {
    await prisma.discount.delete({ where: { id } })
    return res.status(200).send({ message: 'Discount successfuly deleted' })
  }
}

export default createHandler(OptionHandler)
