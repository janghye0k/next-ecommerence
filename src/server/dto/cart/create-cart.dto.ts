import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCartDTO {
  @IsNotEmpty()
  @IsString()
  productId!: string

  @IsNotEmpty()
  @IsNumber()
  productInventoryId!: number

  @IsNotEmpty()
  @IsNumber()
  qty!: number
}
