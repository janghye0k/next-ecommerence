import {
  BadRequestException,
  Body,
  Catch,
  ConflictException,
  createHandler,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  ValidationPipe,
} from 'next-api-decorators'
import { CreateUserDTO } from '@/server/dto/user/create-user.dto'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextApiResponse } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import AuthGuard from '@/server/gurad/auth.guard'
import { GetSession } from '@/server/decorators'
import { NextAuthSession } from '@/types/next-auth'
import AdminGuard from '@/server/gurad/admin.guard'
import { ChangeRoleDTO, UpdateUserDTO } from '@/server/dto/user'
import { deleteFile } from '@/lib/supabase-storage'
import {
  findUserOption,
  UserRelationColumn,
} from '@/server/repository/user.repository'
import exceptionHandler from '@/server/exception'

const saltRound = 13
const adapter = PrismaAdapter(prisma)

@Catch(exceptionHandler)
class UserHandler {
  @Get()
  public async getUsers(@Res() res: NextApiResponse) {
    const users = await prisma.user.findMany()
    return res.status(200).send({
      users,
      message: 'Get users',
    })
  }

  @Get('/info')
  @AuthGuard()
  public async getUserAddress(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Query('includes') includes?: UserRelationColumn | UserRelationColumn[],
  ) {
    const include = findUserOption(includes)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include,
    })
    return res.status(200).send({ message: 'Successfully get user', user })
  }

  @Get('/find/:id')
  public async getUser(
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

  @Post()
  public async createUser(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) body: CreateUserDTO,
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

  @Delete()
  @AuthGuard()
  public async deleteUser(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    const { user } = session
    if (user.image?.length) {
      await deleteFile(user.image)
    }
    await prisma.user.delete({ where: { id: user.id } })
    return res.status(200).send({ message: 'Delete user success' })
  }

  @Patch()
  @AuthGuard()
  public async updateUser(
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
    @Body(ValidationPipe({ whitelist: true })) body: UpdateUserDTO,
  ) {
    const updateUserDTO: UpdateUserDTO = JSON.parse(
      JSON.stringify(UpdateUserDTO),
    )

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: updateUserDTO,
    })

    return res.status(200).send({ user, message: 'Successfully update user' })
  }

  @Patch('/role')
  @AdminGuard()
  public async applyAdminRole(
    @Res() res: NextApiResponse,
    @Body(ValidationPipe({ whitelist: true })) { userId, role }: ChangeRoleDTO,
  ) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    })
    return res.status(200).send({
      user,
      message: `Change userId: "${userId}"' admin role`,
    })
  }
}

export default createHandler(UserHandler)
