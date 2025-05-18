import { IsString, IsEnum } from 'class-validator';

export enum UserRole {
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
}

export class LoginDto {
  @IsString()
  accessCode: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class CLoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
