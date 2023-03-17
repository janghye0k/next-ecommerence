import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateReviewDTO {
  @IsOptional()
  @IsNumber()
  score!: number

  @IsOptional()
  @IsString()
  content!: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images!: string[]
}
