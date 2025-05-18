import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePickupRequestDto } from './dto/create-pickup-request.dto';
import { PusherService } from '../pusher/pusher.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PickupService {
  private readonly logger = new Logger(PickupService.name);

  constructor(
    private prisma: PrismaService,
    private pusherService: PusherService,
    private readonly emailService: EmailService,
  ) {}

  async createRequest(createRequestDto: CreatePickupRequestDto) {
    try {
      // Fetch student and parent details from the database
      const student = await this.prisma.student.findUnique({
        where: { id: createRequestDto.studentId },
        include: { teacher: true },
      });

      if (!student) {
        throw new Error('Student not found');
      }

      const parent = await this.prisma.parent.findUnique({
        where: { id: createRequestDto.parentId },
      });

      if (!parent) {
        throw new Error('Parent not found');
      }

      // Create the pickup record in the database
      const pickupRecord = await this.prisma.pickupRecord.create({
        data: {
          studentId: createRequestDto.studentId,
          parentId: createRequestDto.parentId,
          status: 'PARENT_ARRIVED',
          location: createRequestDto.location,
        },
      });

      // Trigger Pusher event
      await this.pusherService.trigger('student-status', 'status-update', {
        type: 'STATUS_UPDATE',
        studentId: student.id,
        grade: student.teacher?.grade,
        status: 'PENDING_PICKUP',
      });

      // Prepare data to pass to the email service
      const emailData = {
        studentName: student.name,
        studentGrade: student.teacher?.grade,
        studentClass: '',
        parentName: parent.name,
        parentEmail: student.email,
        location: createRequestDto.location,
      };

      // Send email notification
      await this.emailService.sendPickupRequestNotification(emailData);

      return pickupRecord;
    } catch (error) {
      this.logger.error('Error creating pickup request:', error);
      throw error;
    }
  }
}
