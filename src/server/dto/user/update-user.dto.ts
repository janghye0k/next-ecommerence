import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  email!: string

  @IsOptional()
  @IsDate()
  birthday!: Date

  @IsOptional()
  @IsNumber()
  tall!: number

  @IsOptional()
  @IsNumber()
  weight!: number

  @IsOptional()
  @IsString()
  image!: string
}
