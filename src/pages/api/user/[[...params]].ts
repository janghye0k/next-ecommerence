import {
  BadRequestException,
  Body,
  ConflictException,
  createHandler,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  ValidationPipe,
} from 'next-api-decorators'
import { CreateUserDTO } from '@/server/dto/user.dto'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const saltRound = 13
const adapter = PrismaAdapter(prisma)

class UserHandler {
  @Get()
  public async getUsers(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
  ) {
    const users = await prisma.user.findMany()
    return res.status(200).send({
      users,
      message: 'Get users',
    })
  }

  @Post()
  public async createUser(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
    @Body(ValidationPipe) body: CreateUserDTO,
  ) {
    const { password, email, username, ...rest } = body

    const salt = await bcrypt.genSalt(saltRound)
    const pwd = await bcrypt.hash(password, salt)

    const existEmail = await prisma.user.findUnique({ where: { email } })
    if (!!existEmail)
      throw new ConflictException(`Email "${email}" is aleady used`)
    const existUsername = await prisma.user.findUnique({ where: { username } })
    if (!!existUsername)
      throw new ConflictException(
        `Username "${username}" is aleady been signed in user`,
      )

    const user = await prisma.user.create({
      data: { email, pwd, username, ...rest },
    })
    const account = await prisma.account.create({
      data: {
        userId: user.id,
        providerAccountId: user.id,
        provider: 'credential',
        type: 'credential',
      },
    })
    adapter.linkAccount(account as any)

    res.status(201).send({
      user,
      message: `Create User name "${user.name}"`,
    })
  }

  @Delete('/')
  public async deleteUser(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
  ) {
    /** @todo 세션이용 삭제구현 */
    res.status(200).send({ message: 'Delete user success' })
  }

  @Get('/:id')
  public async getUser(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
    @Param('id') id: string,
    @Query('column') column: string,
  ) {
    const hasQuery = Boolean(column)
    if (hasQuery && !['email', 'username'].includes(column))
      throw new BadRequestException(
        `Query parameter column value must be in "email" | "username", but you send wrong column name: "${column}"`,
      )
    const where = hasQuery ? { [column]: id } : { id }
    const user = await prisma.user.findUnique({ where })
    res.status(200).send({
      user,
      message: `Find user by ${column}: "${id}"`,
    })
  }
}

export default createHandler(UserHandler)
