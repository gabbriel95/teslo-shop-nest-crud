import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  dni: string;

  @IsNumber()
  @Min(18)
  @Max(120)
  age: number;

  @IsString()
  @IsOptional()
  job?: string;

  @IsDate()
  @IsOptional()
  createDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
