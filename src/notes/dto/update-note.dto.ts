import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The title of the note',
    required: false,
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The title of the note',
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'The title of the note',
    required: false,
  })
  tags?: string[];
}
