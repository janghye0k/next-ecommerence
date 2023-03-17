import { IsBoolean, IsOptional, IsNumber } from 'class-validator'

export class UpdateOrderItemDTO {
  @IsOptional()
  @IsNumber()
  productInventoryId!: number

  @IsOptional()
  @IsNumber({ allowNaN: true })
  discountId!: number

  @IsOptional()
  @IsNumber()
  qty!: number

  @IsOptional()
  @IsNumber()
  deliveryStatus!: number

  @IsOptional()
  @IsBoolean()
  isRefund!: boolean
}
