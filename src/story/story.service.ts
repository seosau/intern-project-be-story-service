import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoryRequest, CreateStoryResponse, DeleteStoryRequest, DeleteStoryResponse, GetAllStoriesRequest, GetAllStoriesResponse, GetStoryRequest, GetStoryResponse } from 'src/generated/story';
import { StoryRepository } from './story.repository';
import { reflect } from './story.functions';

@Injectable()
export class StoryService {

    constructor(
        private readonly storyRepo: StoryRepository,
    ) {

    }

    async deleteStory(data: DeleteStoryRequest): Promise<DeleteStoryResponse> {
        const story = await this.storyRepo.findById(data.id)

        if (!story) {
            throw new NotFoundException(`Can not find story with condition id: ${data.id}`)
        }

        if (data.deletorId !== story.userId) {
            throw new ForbiddenException('You not have permission to delete this story')
        }

        const deletedStory = await this.storyRepo.softDelete(data.id)

        if (!deletedStory) {
            throw new Error('Error when delete this story')
        }

        const resp: DeleteStoryResponse = {
            story: reflect(deletedStory)
        }

        return resp
    }
    async getOneStory(data: GetStoryRequest): Promise<GetStoryResponse> {
        const story = await this.storyRepo.findById(data.id)

        if (!story) {
            throw new Error(`Can not find story with condition id: ${data.id}`)
        }

        const resp: GetStoryResponse = {
            story: reflect(story)
        }

        return resp
    }
    async getAllStory(data: GetAllStoriesRequest): Promise<GetAllStoriesResponse> {
        const stories = await this.storyRepo.getAllStory()

        if (!stories || stories.length === 0) {
            return {
                stories: []
            }
        }

        const resp = {
            stories: stories.map((story) => reflect(story))
        } as GetAllStoriesResponse
        const indexToFirst = resp.stories.findIndex((story) => story.id === data.firtId)
        if(indexToFirst > 0) {
            const [item] = resp.stories.splice(indexToFirst, 1);
            resp.stories.unshift(item);
        }
        return resp;
    }
    async createStory(data: CreateStoryRequest): Promise<CreateStoryResponse> {
        const created = await this.storyRepo.createStory(data)

        if (!created) {
            throw new Error(`Can not create story`)
        }

        const resp = reflect(created);

        return {
            story: resp
        };
    }
}
