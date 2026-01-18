import { Injectable } from '@nestjs/common';
import { EntriesRepository } from './entries.repository';
import { CreateEntryDto } from './dto/createEntriesDto';

@Injectable()
export class EntriesService {
    constructor(private entriesRepository: EntriesRepository) {}

    async createNewEntry(data: CreateEntryDto) {
        const response = await this.entriesRepository.createNewEntry(data);
        return response;
    }

}
