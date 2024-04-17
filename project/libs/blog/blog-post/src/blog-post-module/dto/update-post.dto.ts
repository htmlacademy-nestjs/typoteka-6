import { ArrayNotEmpty, IsArray, IsNotEmpty,IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public content?: string;

  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  public categories?: string[];
}
