import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

class ItemDTO {
  @IsNotEmpty()
  @IsString()
  productId!: string

  @IsNotEmpty()
  @IsNumber()
  productInventoryId!: number

  @IsOptional()
  @IsNumber()
  discountId!: number

  @IsNotEmpty()
  @IsNumber()
  qty!: number

  @IsOptional()
  @IsNumber()
  deliveryStatus!: number

  @IsOptional()
  @IsBoolean()
  isRefund!: boolean
}

export class CreateOrderItemDTO {
  @IsNotEmpty()
  @IsString()
  orderId!: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDTO)
  items!: ItemDTO[]
}
