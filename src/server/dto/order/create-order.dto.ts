import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsNumber()
  addressId!: number

  @IsNotEmpty()
  @IsNumber()
  total!: number
}
