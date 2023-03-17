import { IsNumber, IsOptional } from 'class-validator'

export class UpdateCartDTO {
  @IsOptional()
  @IsNumber()
  productInventoryId!: number

  @IsOptional()
  @IsNumber()
  qty!: number
}
