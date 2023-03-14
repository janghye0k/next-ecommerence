import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class SizeDTO {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsNumber()
  value!: number
}
