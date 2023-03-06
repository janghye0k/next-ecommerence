/**
 * Next Auth Database
 */

type PrismaAccount = {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}

type PrismaSession = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  user: PrismaUser
}

type PrismaVerificationToken = {
  identifier: string
  token: string
  expires: Date
}

/**
 * Database Common Types
 * 데이터베이스 공통 타입
 */

type PrismaTableId<T> = {
  id: T
}

type PrismaTableDate = {
  createdAt: Date | string
  updatedAt: Date | string
}

/**
 * Database User Types
 * 데이터베이스 고객 타입
 */

interface PrismaUser
  extends PrismaUserRequire,
    PrismaTableId<string>,
    PrismaTableDate,
    Partial<PrismaUserOptional & PrismaUserRelations> {}

type PrismaUserRequire = {
  username: string
  name: string
  email: string
}

type PrismaUserOptional = {
  role: number
  pwd: string
  birthday: Date
  image: string
  tall: number
  weight: number
  user: object
}

type PrismaUserRelations = {
  addresses: Address[]
  likes: Like[]
  carts: Cart[]
  orders: Order[]
  reviews: Review[]

  accounts: PrismaAccount[]
  sessions: PrismaSession[]
}

/**
 * Database Address Types
 * 데이터베이스 주소 타입
 */

type Address = AddressRequire &
  PrismaTableId<number> &
  PrismaTableDate &
  Partial<AddressOptional & AddressRelations>

type AddressRequire = {
  name: string
  recipient: string
  phone: number
  postCode: number
  addressBase: string
  user: PrismaUser
  userId: string
}

type AddressOptional = {
  addressDetail: string
  message: string
}

type AddressRelations = {
  orders: Order[]
}

/**
 * Database Product Types
 * 데이터베이스 상품 타입
 */

type Product = ProductRequire &
  PrismaTableId<string> &
  PrismaTableDate &
  Partial<ProductOptional & ProductRelations>

type ProductRequire = {
  thumbnail: string
  name: string
  price: number
  category: Category
}

type ProductOptional = {
  images: string[]
  description: string
  season: string[]
  fit: string[]
  elastic: string
  opacity: string
  show: boolean
}

type ProductRelationIds = {
  categoryId: number
}

type ProductRelations = {
  discounts: Discount[]
  likes: Like[]
  carts: Cart[]
  orders: OrderItem[]
  reviews: Review[]
  inventory: ProductInventory[]
}

/**
 * Database ProductInventory Types
 * 데이터베이스 상품 목록 타입
 */

type ProductInventory = PrismaTableId<number> &
  PrismaTableDate &
  ProductInventoryRequire &
  Partial<ProductInventoryRelations & ProductInventoryRelationIds>

type ProductInventoryRequire = {
  qty: number
  product: Product
  color: Color
  size: Size
}

type ProductInventoryRelationIds = {
  productId: string
  colorId: number
  sizeId: number
}

type ProductInventoryRelations = {
  carts: Cart[]
  orders: OrderItem[]
}

/**
 * Database Category Types
 * 데이터베이스 카테고리 타입
 */

type Category = PrismaTableDate &
  PrismaTableId<number> &
  CategoryRequire &
  Partial<CategoryRelations>

type CategoryRequire = {
  fullName: string
  names: string[]
}

type CategoryRelations = {
  products: Product[]
}

/**
 * Database Color Types
 * 데이터베이스 색상 타입
 */

type Color = PrismaTableDate &
  PrismaTableId<number> &
  ColorRequire &
  Partial<ColorRelations>

type ColorRequire = {
  name: string
  code: string
}

type ColorRelations = {
  products: Product[]
}

/**
 * Database Size Types
 * 데이터베이스 사이즈 타입
 */

type Size = PrismaTableDate &
  PrismaTableId<number> &
  SizeRequire &
  Partial<SizeRelations>

type SizeRequire = {
  name: string
  value: number
}

type SizeRelations = {
  products: Product[]
}

/**
 * Database Discount Types
 * 데이터베이스 사이즈 타입
 */

type Discount = PrismaTableDate &
  PrismaTableId<number> &
  DiscountRequire &
  Partial<DiscountOptional & DiscountRelations>

type DiscountRequire = {
  name: string
  description: string
  percent: number
}

type DiscountOptional = {
  show: boolean
}

type DiscountRelations = {
  products: Product[]
  orders: OrderItem[]
}

/**
 * Database Like Types
 * 데이터베이스 좋아요 타입
 */

type Like = PrismaTableDate &
  PrismaTableId<number> &
  LikeRequire &
  Partial<LikeRelationIds>

type LikeRequire = {
  user: PrismaUser
  product: Product
}

type LikeRelationIds = {
  userId: string
  productId: string
}

/**
 * Database Cart Types
 * 데이터베이스 장바구니 타입
 */

type Cart = PrismaTableDate &
  PrismaTableId<number> &
  CartRequire &
  Partial<CartRelationIds>

type CartRequire = {
  qty: 1
  user: PrismaUser
  product: Product
  productInventory: ProductInventory
}

type CartRelationIds = {
  userId: string
  productId: string
  productInventoryId: string
}

/**
 * Database Order Types
 * 데이터베이스 주문 타입
 */

type Order = PrismaTableDate &
  PrismaTableId<string> &
  OrderRequire &
  Partial<OrderRelationIds & OrderRelations>

type OrderRequire = {
  total: number
  user: PrismaUser
  payment: Payment
  address: Address
}

type OrderRelationIds = {
  userId: string
  paymentId: string
  addressId: string
}

type OrderRelations = {
  items: OrderItem[]
}

/**
 * Database OrderItem Types
 * 데이터베이스 주문내역 타입
 */

type OrderItem = PrismaTableDate &
  PrismaTableId<string> &
  OrderItemRequire &
  Partial<OrderItemOptional & OrderItemRelationIds & OrderItemRelations>

type OrderItemRequire = {
  qty: number
  order: Order
  product: Product
  productInventory: ProductInventory
}

type OrderItemOptional = {
  deliveryStatus: number
  isRefund: boolean
}

type OrderItemRelationIds = {
  orderId: string
  productId: string
  productInventoryId: string
  discountId: string
}

type OrderItemRelations = {
  discount: Discount
  review: Review
}

/**
 * Database Payment Types
 * 데이터베이스 결제 타입
 */

type Payment = PrismaTableDate &
  PrismaTableId<string> &
  PaymentRequire &
  Partial<PaymentOptional & PaymentRelationIds & PaymentRelations>

type PaymentRequire = {
  order: Order
  method: string
  methodName: string
  purchasedAt: Date
}

type PaymentOptional = {
  orderName: string
  cardName: string
  cardNo: string
  receiptUrl: string
}

type PaymentRelationIds = {
  orderId: string
}

/**
 * Database Review Types
 * 데이터베이스 리뷰 타입
 */

type Review = PrismaTableDate &
  PrismaTableId<string> &
  ReviewRequire &
  Partial<ReviewOptional & ReviewRelationIds & ReviewRelations>

type ReviewRequire = {
  score: number
  user: PrismaUser
  product: Product
  orderItem: OrderItem
}

type ReviewOptional = {
  images: string[]
}

type ReviewRelationIds = {
  userId: string
  productId: string
  orderItemId: string
}
