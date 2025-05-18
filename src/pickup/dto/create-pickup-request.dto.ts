import { IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePickupRequestDto {
  @IsString()
  studentId: string;

  @IsString()
  parentId: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value && typeof value === 'string' ? value.trim() : undefined,
  ) // Safely handle undefined/null
  location?: string; // Make location optional
}
