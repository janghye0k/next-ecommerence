import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  fullName!: string

  @IsNotEmpty()
  @IsArray()
  names!: string[]
}
