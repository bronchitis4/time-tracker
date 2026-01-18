import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EntriesService } from './entries/entries.service';
import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [PrismaModule, EntriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
