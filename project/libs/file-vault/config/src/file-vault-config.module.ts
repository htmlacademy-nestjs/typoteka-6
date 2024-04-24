import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import fileVaultConfig from './file-vault.config';

const ENV_FILE_PATH = 'apps/file-vault/file-vault.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileVaultConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class FileVaultConfigModule {}
