import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { CreateStoryRequest } from "src/generated/story";

export class StoryRepository extends PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> {
    constructor () {
        super();
    }

    async createStory (data: Prisma.storyUncheckedCreateInput) {
        return this.story.create({data : data})
    }

    async getAllStory () {
        const now = new Date()
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        return this.story.findMany({
            where: {
                createdAt: {
                    gte: twentyFourHoursAgo
                },
                deletedAt: null,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async findById (id: string) {
        return this.story.findFirst({
            where: {
                id
            }
        })
    }

    async softDelete (id: string) {
        return this.story.delete({
            where: {
                id
            }
        })
    }
}