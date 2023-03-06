declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET: string
    KAKAO_ID: string
    KAKAO_SECRET: string
    GOOGLE_ID: string
    GOOGLE_SECRET: string
    DATABASE_URL: string
    NODEMAILER_USER: string
    NODEMAILER_PASSWORD: string
  }
}
