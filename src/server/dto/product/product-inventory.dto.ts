import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ProductInventoryDTO {
  @IsNotEmpty()
  @IsString()
  productId!: string

  @IsNotEmpty()
  @IsNumber()
  colorId!: number

  @IsNotEmpty()
  @IsNumber()
  sizeId!: number

  @IsNotEmpty()
  @IsNumber()
  qty!: number
}
