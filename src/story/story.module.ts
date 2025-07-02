import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { StoryRepository } from './story.repository';

@Module({
  controllers: [StoryController],
  providers: [StoryService, StoryRepository],
})
export class StoryModule {}
