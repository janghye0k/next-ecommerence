import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsString()
  username!: string

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsOptional()
  @IsDate()
  birthday!: Date

  @IsOptional()
  @IsString()
  google!: string
}
