import { Body, Controller, Post } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/createEntriesDto';

@Controller('entries')
export class EntriesController {
    constructor(private entriesService: EntriesService) {}

    @Post('/')
    async createNewEntry(@Body() entryData : CreateEntryDto) {
        return this.entriesService.createNewEntry(entryData);
    }
}
