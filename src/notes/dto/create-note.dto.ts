/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
