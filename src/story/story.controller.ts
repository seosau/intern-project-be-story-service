import { Controller } from '@nestjs/common';
import { StoryService } from './story.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateStoryRequest, CreateStoryResponse, DeleteStoryRequest, GetAllStoriesRequest, GetStoryRequest, STORY_SERVICE_NAME } from 'src/generated/story';

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @GrpcMethod(STORY_SERVICE_NAME, 'CreateStoryService')
  async createStory (data: CreateStoryRequest): Promise<CreateStoryResponse> {
    console.log('Create Story Method 00000000000000000000000000000000')
    return this.storyService.createStory(data);
  }

  @GrpcMethod(STORY_SERVICE_NAME, 'GetAllStoryService')
  async getAllStory (data: GetAllStoriesRequest) {
    console.log('Get All Story 0000000000000000000000000000000000000000')
    return this.storyService.getAllStory(data)
  }

  @GrpcMethod(STORY_SERVICE_NAME, 'GetStoryService')
  async getOneStory (data: GetStoryRequest) {
    console.log('Get One Story 00000000000000000000000000000000000000');
    return this.storyService.getOneStory(data)
  }

  @GrpcMethod(STORY_SERVICE_NAME, 'DeleteStoryService')
  async deleteStory (data: DeleteStoryRequest) {
    console.log('Delete Story Method 00000000000000000000000000000000')
    return this.storyService.deleteStory(data)
  }
}
