import { Global, Module } from '@nestjs/common';

import { PrismaClientService } from './prisma-client.service';

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class PrismaClientModule {}
