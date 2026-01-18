import { Injectable } from '@nestjs/common';
import { EntriesRepository } from './entries.repository';
import { CreateEntryDto } from './dto/createEntriesDto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class EntriesService {
    constructor(private entriesRepository: EntriesRepository) { }

    async createNewEntry(data: CreateEntryDto) {
        const { date, hours } = data;
        
        const totalHours = await this.entriesRepository.getTotalHoursByDate(date);
        if(totalHours && totalHours.plus(hours).gt(24)) {
            throw new BadRequestException('Total hours per day cannot exceed 24');
        }

        return await this.entriesRepository.createNewEntry(data);
    }

    async getEntries() {
        return await this.entriesRepository.getEntrie();
    }

}
