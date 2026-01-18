import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class EntriesRepository {
    constructor(private prisma: PrismaService) {}
    
    createNewEntry(data: Prisma.EntryCreateManyInput) {
        return this.prisma.entry.create({data});
    }
}