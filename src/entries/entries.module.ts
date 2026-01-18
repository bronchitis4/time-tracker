import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { EntriesRepository } from './entries.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [EntriesRepository],
  providers: [EntriesService, EntriesRepository],
  controllers: [EntriesController]
})
export class EntriesModule {}
