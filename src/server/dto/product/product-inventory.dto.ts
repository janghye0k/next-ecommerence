import { Type } from 'class-transformer'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator'

class InventoryDTO {
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

export class ProductInventoryDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryDTO)
  inventorys!: InventoryDTO[]
}
