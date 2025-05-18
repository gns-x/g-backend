import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID || '1910423',
      key: process.env.PUSHER_KEY || 'bc0503efea536bb60290',
      secret: process.env.PUSHER_SECRET || '812c084ac5868d2e59b5',
      cluster: process.env.PUSHER_CLUSTER || 'eu',
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    try {
      await this.pusher.trigger(channel, event, data);
    } catch (error) {
      console.error('Pusher trigger error:', error);
      throw error;
    }
  }
}
