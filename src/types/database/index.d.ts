/**
 * Database Common Types
 * 데이터베이스 공통 타입
 */

type TableId<T> = {
  id: T
}

type TableDate = {
  created_at: Date | string
  updated_at: Date | string
}

/**
 * Database User Types
 * 데이터베이스 유저 타입
 */

interface User
  extends UserRequire,
    TableId<string>,
    TableDate,
    Partial<UserOptional & UserRelations> {
  pwd?: string
}

type UserRequire = {
  pwd: string
  first_name: string
  last_name: string
  email: string
}

type UserOptional = {
  image: string
  tall: number
  weight: number
}

type UserRelations = {
  addresses: Address[]
  likes: Like[]
  carts: Cart[]
  orders: Order[]
  reviews: Review[]
}

/**
 * Database Address Types
 * 데이터베이스 주소 타입
 */

type Address = AddressRequire &
  TableId<number> &
  TableDate &
  Partial<AddressOptional>

type AddressRequire = {
  name: string
  recipient: string
  phone: number
  post_code: number
  address_base: string
  user: User
}

type AddressOptional = {
  address_detail: string
  message: string
}

type AddressRelationIds = {
  user_id: string
}

/**
 * Database Product Types
 * 데이터베이스 상품 타입
 */

type Product = ProductRequire &
  TableId<string> &
  TableDate &
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
  category_id: number
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

type ProductInventory = TableId<number> &
  TableDate &
  ProductInventoryRequire &
  Partial<ProductInventoryRelations & ProductInventoryRelationIds>

type ProductInventoryRequire = {
  qty: number
  product: Product
  color: Color
  size: Size
}

type ProductInventoryRelationIds = {
  product_id: string
  color_id: number
  size_id: number
}

type ProductInventoryRelations = {
  carts: Cart[]
  orders: OrderItem[]
}

/**
 * Database Category Types
 * 데이터베이스 카테고리 타입
 */

type Category = TableDate &
  TableId<number> &
  CategoryRequire &
  Partial<CategoryRelations>

type CategoryRequire = {
  full_name: string
  names: string[]
}

type CategoryRelations = {
  products: Product[]
}

/**
 * Database Color Types
 * 데이터베이스 색상 타입
 */

type Color = TableDate &
  TableId<number> &
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

type Size = TableDate & TableId<number> & SizeRequire & Partial<SizeRelations>

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

type Discount = TableDate &
  TableId<number> &
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

type Like = TableDate & TableId<number> & LikeRequire & Partial<LikeRelationIds>

type LikeRequire = {
  user: User
  product: Product
}

type LikeRelationIds = {
  user_id: string
  product_id: string
}

/**
 * Database Cart Types
 * 데이터베이스 장바구니 타입
 */

type Cart = TableDate & TableId<number> & CartRequire & Partial<CartRelationIds>

type CartRequire = {
  qty: 1
  user: User
  product: Product
  product_inventory: ProductInventory
}

type CartRelationIds = {
  user_id: string
  product_id: string
  product_inventory_id: string
}

/**
 * Database Order Types
 * 데이터베이스 주문 타입
 */

type Order = TableDate &
  TableId<string> &
  OrderRequire &
  Partial<OrderRelationIds & OrderRelations>

type OrderRequire = {
  total: number
  user: User
  payment: Payment
}

type OrderRelationIds = {
  user_id: string
  payment_id: string
}

type OrderRelations = {
  items: OrderItem[]
}

/**
 * Database OrderItem Types
 * 데이터베이스 주문내역 타입
 */

type OrderItem = TableDate &
  TableId<string> &
  OrderItemRequire &
  Partial<OrderItemOptional & OrderItemRelationIds & OrderItemRelations>

type OrderItemRequire = {
  qty: number
  order: Order
  product: Product
  product_inventory: ProductInventory
}

type OrderItemOptional = {
  delivery_status: number
  is_refund: boolean
}

type OrderItemRelationIds = {
  order_id: string
  product_id: string
  product_inventory_id: string
  discount_id: string
}

type OrderItemRelations = {
  discount: Discount
  review: Review
}

/**
 * Database Payment Types
 * 데이터베이스 결제 타입
 */

type Payment = TableDate &
  TableId<string> &
  PaymentRequire &
  Partial<PaymentOptional & PaymentRelationIds & PaymentRelations>

type PaymentRequire = {
  order: Order
  method: string
  method_name: string
  purchased_at: Date
}

type PaymentOptional = {
  order_name: string
  card_name: string
  card_no: string
  receipt_url: string
}

type PaymentRelationIds = {
  order_id: string
}

/**
 * Database Review Types
 * 데이터베이스 리뷰 타입
 */

type Review = TableDate &
  TableId<string> &
  ReviewRequire &
  Partial<ReviewOptional & ReviewRelationIds & ReviewRelations>

type ReviewRequire = {
  score: number
  user: User
  product: Product
  order_item: OrderItem
}

type ReviewOptional = {
  images: string[]
}

type ReviewRelationIds = {
  user_id: string
  product_id: string
  order_item_id: string
}
