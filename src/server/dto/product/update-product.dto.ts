import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  thumbnail!: string

  @IsOptional()
  @IsString({ each: true })
  images!: string[]

  @IsOptional()
  @IsString()
  name!: string

  @IsOptional()
  @IsNumber()
  categoryId!: number

  @IsOptional()
  @IsString()
  description!: string

  @IsOptional()
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
