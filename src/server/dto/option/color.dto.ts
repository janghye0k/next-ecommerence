import { IsNotEmpty, IsString } from 'class-validator'

export class ColorDTO {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  code!: string
}
