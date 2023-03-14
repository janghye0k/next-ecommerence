import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  thumbnail!: string

  @IsNotEmpty()
  @IsString({ each: true })
  images!: string[]

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsOptional()
  @IsString()
  description!: string

  @IsNotEmpty()
  @IsNumber()
  price!: number

  @IsOptional()
  @IsString({ each: true })
  season!: string[]

  @IsOptional()
  @IsString({ each: true })
  fit!: string[]

  @IsOptional()
  @IsString()
  elastic!: string

  @IsOptional()
  @IsString()
  opacity!: string
}
