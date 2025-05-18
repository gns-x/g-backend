import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { PickupModule } from './pickup/pickup.module';
import { PrismaModule } from './prisma/prisma.module';
import { WebsocketModule } from './websocket/websocket.module';
import { PusherModule } from './pusher/pusher.module';
import { EmailModule } from './email/email.module';
import { InsightsModule } from './insights/insights.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    StudentsModule,
    PickupModule,
    WebsocketModule,
    PusherModule,
    EmailModule,
    InsightsModule,
    ProductsModule,
  ],
})
export class AppModule {}
