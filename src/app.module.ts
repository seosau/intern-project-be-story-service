import { Module } from '@nestjs/common';
import { PrismaModule } from './configs/prisma/prisma.module';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    PrismaModule,
    StoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
