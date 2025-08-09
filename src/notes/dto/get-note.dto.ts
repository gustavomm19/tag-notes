import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetNoteDto {
  @IsNumber()
  @ApiProperty({
    description: 'The title of the note',
    required: true,
  })
  id: number;

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

  @IsString()
  @ApiProperty({
    description: 'The tags of the note',
    required: true,
  })
  tags: string;

  @IsString()
  @ApiProperty({
    description: 'The date the note was created',
    required: true,
  })
  createdAt: string;

  @IsString()
  @ApiProperty({
    description: 'The date the note was updated',
    required: true,
  })
  updatedAt: string;
}
