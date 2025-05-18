// src/pusher/pusher.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Controller('pusher')
export class PusherController {
  constructor(private readonly pusherService: PusherService) {}

  @Post('send-message')
  sendMessage(@Body() message: { channel: string; message: string }) {
    const { channel, message: msg } = message;
    return this.pusherService.trigger(channel, 'new-message', { message: msg });
  }
}
