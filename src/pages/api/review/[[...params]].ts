import {
  Body,
  Catch,
  createHandler,
  Delete,
  Get,
  Param,
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
import { CreateReviewDTO, UpdateReviewDTO } from '@/server/dto/review'

@Catch(exceptionHandler)
class ReviewHandler {
  @Get()
  @AuthGuard()
  public async getReviews(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    const reviews = await prisma.review.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: { category: true, inventory: { include: { color: true } } },
        },
        orderItem: {
          include: {
            productInventory: { include: { color: true, size: true } },
          },
        },
      },
    })
    return res.status(200).send({ reviews })
  }

  @Post()
  @AuthGuard()
  public async createReview(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    createReviewDTO: CreateReviewDTO,
  ) {
    const review = await prisma.review.create({
      data: { userId: session.user.id, ...createReviewDTO },
    })

    return res.status(201).send({ review })
  }

  @Patch('/:id')
  @AuthGuard()
  public async updateReview(
    @Param('id') id: string,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body(ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    updateReviewDTO: UpdateReviewDTO,
  ) {
    await prisma.review.updateMany({
      where: { userId: session.user.id, id },
      data: updateReviewDTO,
    })

    return res
      .status(200)
      .send({ message: `Successfully update review by id: '${id}'` })
  }

  @Delete('/:id')
  @AuthGuard()
  public async deleteReview(
    @Param('id') id: string,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    await prisma.review.deleteMany({ where: { id, userId: session.user.id } })
    return res
      .status(200)
      .send({ message: `Successfully delete review id: ${id}` })
  }
}

export default createHandler(ReviewHandler)
