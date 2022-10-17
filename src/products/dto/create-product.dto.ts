import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive() // số nguyên
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsString({})
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
