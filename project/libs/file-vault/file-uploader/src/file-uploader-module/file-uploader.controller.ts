import 'multer';
import { Express } from 'express';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileUploaderService } from './file-uploader.service';

@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploaderService.saveFile(file);
  }
}
