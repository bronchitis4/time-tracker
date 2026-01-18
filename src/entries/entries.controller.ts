import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/createEntriesDto';

@Controller('entries')
export class EntriesController {
    constructor(private entriesService: EntriesService) { }

    @Post('/')
    async createNewEntry(@Body() entryData: CreateEntryDto) {
        return this.entriesService.createNewEntry(entryData);
    }

    @Get('/')
    async getEntries(
        @Query('limit') limit = '20',
        @Query('cursor') cursor?: string,
    ) {
        return this.entriesService.getEntries({
            limit: Number(limit),
            cursor: cursor,
        });
    }
}
