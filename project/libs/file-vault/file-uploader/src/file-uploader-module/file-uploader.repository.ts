import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/data-access';

import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';
import { FileModel } from './file.model';

@Injectable()
export class FileUploaderRepository extends BaseMongoRepository<FileUploaderEntity, FileModel> {
  constructor(
    entityFactory: FileUploaderFactory,
    @InjectModel(FileModel.name) fileModel: Model<FileModel>
    ) {
    super(entityFactory, fileModel);
  }
}
