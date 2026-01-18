import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class EntriesRepository {
    constructor(private prisma: PrismaService) { }

    createNewEntry(data: Prisma.EntryCreateManyInput) {
        return this.prisma.entry.create({ data });
    }

    async getTotalHoursByDate(date: string) {
        const response = await this.prisma.entry.aggregate({
            where: { date },
            _sum: { hours: true },
        });

        return response._sum.hours;
    }

    async getDistinctDates(limit: number, cursorDate?: string) {
        const rows = await this.prisma.entry.findMany({
            distinct: ["date"],
            select: { date: true },
            orderBy: { date: "desc" },
            take: limit,
            where: cursorDate ? { date: { lt: cursorDate } } : undefined,
        });

        return rows.map(r => r.date);
    }
    
    async getEntriesByDates(dates: string[]) {
        return this.prisma.entry.findMany({
            where: { date: { in: dates } },
            orderBy: [{ date: "desc" }, { id: "desc" }],
        });
    }

    async getEntries(limit: number, cursor?: number) {
        return this.prisma.entry.findMany({
            take: limit,
            where: cursor ? { id: { lt: cursor } } : undefined,
            orderBy: { id: "desc" },
        });
    }

}