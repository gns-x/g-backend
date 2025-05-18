import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum StudentStatus {
  IN_CLASS = 'IN_CLASS',
  PENDING_PICKUP = 'PENDING_PICKUP',
  WITH_PARENT = 'WITH_PARENT',
}

export class UpdateStudentStatusDto {
  @IsEnum(StudentStatus)
  status: StudentStatus;

  @IsString()
  @IsOptional()
  parentId?: string;
}
