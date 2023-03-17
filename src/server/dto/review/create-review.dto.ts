import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateReviewDTO {
  @IsNotEmpty()
  @IsNumber()
  score!: number

  @IsNotEmpty()
  @IsString()
  content!: string

  @IsNotEmpty()
  @IsString()
  productId!: string

  @IsNotEmpty()
  @IsString()
  orderItemId!: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images!: string[]
}
