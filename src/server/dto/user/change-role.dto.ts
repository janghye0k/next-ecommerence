import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ChangeRoleDTO {
  @IsNotEmpty()
  @IsString()
  userId!: string

  @IsNotEmpty()
  @IsNumber()
  role!: number
}
