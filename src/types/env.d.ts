declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET: string
    KAKAO_ID: string
    KAKAO_SECRET: string
    GOOGLE_ID: string
    GOOGLE_SECRET: string
    DATABASE_URL: string
    SUPABASE_STORAGE_URL: string
    SUPABASE_SERVICE_KEY: string
    NODEMAILER_USER: string
    NODEMAILER_PASSWORD: string
  }
}
