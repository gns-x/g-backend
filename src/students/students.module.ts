import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { PusherService } from 'src/pusher/pusher.service';
import { PusherModule } from 'src/pusher/pusher.module';

@Module({
  imports: [PusherModule],
  controllers: [StudentsController],
  providers: [StudentsService, WebsocketGateway, PrismaService, PusherService],
})
export class StudentsModule {}
