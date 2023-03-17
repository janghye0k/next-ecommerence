import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateOrderDTO {
  @IsOptional()
  @IsNumber()
  addressId!: number

  @IsOptional()
  @IsString()
  paymentId!: string

  @IsOptional()
  @IsNumber()
  total!: number
}
