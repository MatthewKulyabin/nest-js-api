import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from '../types/RoleType';
import { UserInterface } from '../types/UserInterface';

export class CreateUserDto implements Omit<UserInterface, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(RoleType, { message: 'Valid role required' })
  role: RoleType;
}
