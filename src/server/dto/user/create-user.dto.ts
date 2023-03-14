import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsOptional()
  @IsDate()
  birthday!: Date
}
