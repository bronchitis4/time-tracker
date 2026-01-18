import { Injectable } from '@nestjs/common';
import { EntriesRepository } from './entries.repository';
import { CreateEntryDto } from './dto/createEntriesDto';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EntriesService {
    constructor(private entriesRepository: EntriesRepository) { }

    async createNewEntry(data: CreateEntryDto) {
        const { date, hours } = data;

        const totalHours = await this.entriesRepository.getTotalHoursByDate(date);
        if (totalHours && totalHours.plus(hours).gt(24)) {
            throw new BadRequestException('Total hours per day cannot exceed 24');
        }

        return await this.entriesRepository.createNewEntry(data);
    }

    async getEntries(params: { limit: number; cursor?: string }) {
        const { limit, cursor } = params;

        const dates = await this.entriesRepository.getDistinctDates(limit, cursor);
        if (dates.length === 0) {
            return { days: [], nextCursor: null };
        }

        const items = await this.entriesRepository.getEntriesByDates(dates);
        const map = new Map<string, { date: string; items: any[]; total: Prisma.Decimal }>();
        for (const e of items) {
            if (!map.has(e.date)) {
                map.set(e.date, { date: e.date, items: [], total: new Prisma.Decimal(0) });
            }
            map.get(e.date)!.items.push(e);
        }

        for (const d of dates) {
            const total = await this.entriesRepository.getTotalHoursByDate(d);
            map.get(d)!.total = total ?? new Prisma.Decimal(0);
        }

        return {
            days: dates.map((d) => map.get(d)!),
            nextCursor: dates[dates.length - 1],
        };
    }

}
