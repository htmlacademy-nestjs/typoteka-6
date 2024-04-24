import { Injectable } from '@nestjs/common';

import { File, EntityFactory } from '@project/shared/core';
import { FileUploaderEntity } from './file-uploader.entity';

@Injectable()
export class FileUploaderFactory implements EntityFactory<FileUploaderEntity> {
  public create(entityPlainData: File): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData);
  }
}
