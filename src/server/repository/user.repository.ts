import { BadRequestException } from 'next-api-decorators'

export type UserRelationColumn =
  | 'addresses'
  | 'likes'
  | 'carts'
  | 'orders'
  | 'reviews'

const USER_RELATIONS: UserRelationColumn[] = [
  'addresses',
  'likes',
  'carts',
  'orders',
  'reviews',
]

const USER_OPTIONS = {
  addresses: true,
  carts: {
    include: {
      product: {
        include: {
          category: true,
          inventory: { include: { color: true } },
        },
      },
      productInventory: { include: { color: true, size: true } },
    },
  },
  likes: {
    include: {
      product: {
        include: {
          category: true,
          inventory: { include: { color: true } },
        },
      },
    },
  },
  orders: {
    include: {
      items: {
        include: {
          discount: true,
          product: { include: { category: true } },
          productInventory: { include: { color: true, size: true } },
          review: true,
        },
      },
      payment: true,
      address: true,
    },
  },
  reviews: {
    include: {
      orderItem: {
        include: {
          productInventory: {
            include: {
              color: true,
              size: true,
            },
          },
        },
      },
      product: {
        include: {
          category: true,
        },
      },
    },
  },
}

export function findUserOption(
  includes?: UserRelationColumn | UserRelationColumn[],
) {
  if (includes === undefined) {
    includes = USER_RELATIONS
  } else if (!Array.isArray(includes)) includes = [includes]

  const badRequest = includes.some((value) => !USER_RELATIONS.includes(value))
  if (badRequest)
    throw new BadRequestException(
      `Query parameter "includes" must be in [${USER_RELATIONS.join()}]`,
    )

  const option: { [key: string]: any } = {}
  includes.forEach((relation) => {
    option[relation] = USER_OPTIONS[relation]
  })

  return option
}
