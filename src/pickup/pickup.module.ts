import { Module } from '@nestjs/common';
import { PickupController } from './pickup.controller';
import { PickupService } from './pickup.service';
import { PusherService } from 'src/pusher/pusher.service';
import { EmailService } from 'src/email/email.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PusherModule } from 'src/pusher/pusher.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [PrismaModule, PusherModule, EmailModule],
  controllers: [PickupController],
  providers: [PickupService, PusherService, EmailService],
})
export class PickupModule {}
