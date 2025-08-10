import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the note',
    required: true,
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'The description of the note',
    required: true,
  })
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    description: 'The list of tags',
    required: false,
  })
  tags?: string[];
}
