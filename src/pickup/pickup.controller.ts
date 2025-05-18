import { Controller, Post, Body, Logger } from '@nestjs/common';
import { PickupService } from './pickup.service';
import { CreatePickupRequestDto } from './dto/create-pickup-request.dto';

@Controller('pickup')
export class PickupController {
  private readonly logger = new Logger(PickupController.name);

  constructor(private readonly pickupService: PickupService) {}

  @Post('request')
  async createRequest(@Body() createRequestDto: CreatePickupRequestDto) {
    try {
      return await this.pickupService.createRequest(createRequestDto);
    } catch (error) {
      this.logger.error('Failed to create pickup request:', error);
      return { error: 'Failed to create pickup request' };
    }
  }
}
