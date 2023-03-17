import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  thumbnail!: string

  @IsNotEmpty()
  @IsString({ each: true })
  images!: string[]

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsNumber()
  categoryId!: number

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

  @IsOptional()
  @IsBoolean()
  show!: boolean
}
