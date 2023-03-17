import { GetSession } from '@/server/decorators'
import { setCookie } from 'cookies-next'
import createTransporter from '@/lib/nodemailer'
import { EmailDTO } from '@/server/dto/email.dto'
import {
  Body,
  Catch,
  createHandler,
  Post,
  Req,
  Res,
  ValidationPipe,
} from 'next-api-decorators'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import handlebars from 'handlebars'
import AuthGuard from '@/server/gurad/auth.guard'
import { NextAuthSession } from '@/types/next-auth'
import exceptionHandler from '@/server/exception'

@Catch(exceptionHandler)
class EmailHandler {
  @Post('/verification')
  async sendEmail(
    /**
     * 인증 메일을 전송한다.
     * 해쉬된 랜덤 숫자와 인증메일로 보낸 랜덤숫자를 비교하여 인증을 진행한다.
     */
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
    @Body(ValidationPipe) { email }: EmailDTO,
  ) {
    const random = Math.random().toFixed(6).slice(2)
    const salt = await bcrypt.genSalt(13)
    const hashedRandom = await bcrypt.hash(random, salt)

    const maxAge = 60 * 2 // 인증유효시간 (2분)

    setCookie('piic.email-verification', hashedRandom, {
      maxAge,
      req,
      res,
    })

    const filePath = resolve('public/html/email-verification.html')
    const source = readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)

    const transporter = createTransporter()
    transporter.sendMail({
      from: 'd0or.hyeok@gmail.com',
      to: email,
      subject: '[PIIC | Sign up] Email verification code',
      html: template({ code: random }),
    })

    return res
      .status(201)
      .send({ message: 'Successfully send email for verification', maxAge })
  }

  @Post('/password')
  @AuthGuard()
  async sendResetPasswordLink(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
    @GetSession() session: NextAuthSession,
  ) {
    const random = Math.random().toFixed(6).slice(2)
    const salt = await bcrypt.genSalt(13)
    const hashedRandom = await bcrypt.hash(random, salt)

    setCookie('piic.password-reset', hashedRandom, {
      maxAge: 60 * 2,
      req,
      res,
    })

    const filePath = resolve('public/html/password-reset.html')
    const source = readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)

    const transporter = createTransporter()
    transporter.sendMail({
      from: 'd0or.hyeok@gmail.com',
      to: session.user.email,
      subject: '[PIIC] Password reset link',
      html: template({ baseUrl: process.env.NEXTAUTH_URL, token: random }),
    })

    return res
      .status(201)
      .send({ message: 'Successfully send email for verification' })
  }
}

export default createHandler(EmailHandler)
