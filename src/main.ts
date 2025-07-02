import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: process.env.STORY_GRPC_URL || '0.0.0.0:50053',
      package: process.env.STORY_GRPC_PACKAGE_NAME || 'story',
      protoPath: join(__dirname, '../proto/story.proto')
    }
  });
  await app.listen(); 
}
bootstrap();
