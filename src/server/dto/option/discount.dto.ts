import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DiscountDTO {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  description!: string

  @IsNotEmpty()
  @IsNumber()
  percent!: number

  @IsOptional()
  @IsString({ each: true })
  productIds!: string[]
}
