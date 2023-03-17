import {
  BadRequestException,
  Body,
  Catch,
  createHandler,
  Delete,
  Get,
  Param,
  ParseNumberPipe,
  Post,
  Res,
} from 'next-api-decorators'
import prisma from '@/lib/prisma'
import exceptionHandler from '@/server/exception'
import AuthGuard from '@/server/gurad/auth.guard'
import { NextApiResponse } from 'next'
import { GetSession } from '@/server/decorators'
import { NextAuthSession } from '@/types/next-auth'

@Catch(exceptionHandler)
class LikeHandler {
  @Get()
  @AuthGuard()
  public async getLikes(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    const likes = await prisma.like.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: { category: true, inventory: { include: { color: true } } },
        },
      },
    })
    return res.status(200).send({ likes })
  }

  @Post()
  @AuthGuard()
  public async createLike(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body() { productId }: { productId: string },
  ) {
    if (!productId || typeof productId !== 'string')
      throw new BadRequestException(
        '"productId" must be included in request body',
      )
    const like = await prisma.like.create({
      data: { userId: session.user.id, productId },
    })

    return res.status(201).send({ like })
  }

  @Delete('/:id')
  @AuthGuard()
  public async deleteLike(
    @Param('id', ParseNumberPipe) id: number,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    await prisma.like.deleteMany({ where: { id, userId: session.user.id } })
    return res
      .status(200)
      .send({ message: `Successfully delete like id: ${id}` })
  }
}

export default createHandler(LikeHandler)
