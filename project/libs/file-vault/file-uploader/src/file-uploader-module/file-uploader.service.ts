import 'multer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { FileVaultConfig } from '@project/file-vault-config';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(
    @Inject(FileVaultConfig.KEY)
    private readonly config: ConfigType<typeof FileVaultConfig>,
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename)
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const destinationFile = this.getDestinationFilePath(file.originalname);

      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFile, file.buffer);

      return destinationFile;
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }
}
