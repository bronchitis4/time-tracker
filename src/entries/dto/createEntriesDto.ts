import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be in YYYY-MM-DD format' })
  date: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  project: string;

  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'hours must be a number' })
  @IsPositive({ message: 'hours must be > 0' })
  hours: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;
}
