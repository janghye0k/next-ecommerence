import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class AddressDTO {
  @IsNotEmpty()
  @IsString()
  userId!: string

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  recipient!: string

  @IsNotEmpty()
  @IsNumber()
  phone!: number

  @IsNotEmpty()
  @IsNumber()
  postCode!: number

  @IsNotEmpty()
  @IsString()
  addressBase!: string

  @IsOptional()
  @IsString()
  addressDetail!: string

  @IsOptional()
  @IsString()
  message!: string
}
