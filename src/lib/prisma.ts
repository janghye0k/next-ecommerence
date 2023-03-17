import { Prisma, PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  global.prisma = new PrismaClient()
} else if (!global.prisma) {
  global.prisma = new PrismaClient()
}

export default global.prisma as PrismaClient

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never
type Entity = A<keyof typeof Prisma>
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>

export function excludeFields<T extends Entity, K extends Keys<T>>(
  type: T,
  omit: K[],
) {
  type Key = Exclude<Keys<T>, K>
  type TMap = Record<Key, true>
  const result: TMap = {} as TMap
  // eslint-disable-next-line no-restricted-syntax
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true
    }
  }
  return result
}
