import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStudentStatusDto } from './dto/update-student-status.dto';
import { PusherService } from '../pusher/pusher.service';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(
    private prisma: PrismaService,
    private pusherService: PusherService,
  ) {}

  async updateStatus(
    studentId: string,
    updateStatusDto: UpdateStudentStatusDto,
  ) {
    this.logger.log(
      `Updating status for student ${studentId} to ${updateStatusDto.status}`,
    );
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { teacher: true },
    });

    if (!student) {
      this.logger.error(`Student not found with id ${studentId}`);
      throw new NotFoundException('Student not found');
    }
    if (updateStatusDto.status === 'WITH_PARENT') {
      //   await this.prisma.pickupRecord.create({
      //     data: {
      //       studentId,
      //       parentId: updateStatusDto.parentId,
      //       status: 'PENDING',
      //     },
      //   });

      // Trigger Pusher event
      await this.pusherService.trigger('student-status', 'status-update', {
        type: 'STATUS_UPDATE',
        studentId: student.id,
        grade: student.teacher?.grade,
        status: 'WITH_PARENT',
      });
    }

    return { success: true };
  }

  async getStudentsByUser(userId: string, role: string) {
    this.logger.log(`Fetching students for user ${userId} with role ${role}`);
    if (role === 'PARENT') {
      return this.prisma.student.findMany({
        where: { parentId: userId },
        orderBy: { name: 'asc' },
      });
    }

    return this.prisma.student.findMany({
      where: { teacherId: userId },
      orderBy: { name: 'asc' },
    });
  }

  async getStudentsByGrade(grade: string) {
    this.logger.log(`Fetching students for grade ${grade}`);
    try {
      const students = await this.prisma.student.findMany({
        where: { grade },
        include: {
          teacher: true,
          parent: true,
        },
        orderBy: { name: 'asc' },
      });

      this.logger.log(`Found ${students.length} students in grade ${grade}`);

      return students.map((student) => ({
        ...student,
        status: 'IN_CLASS',
        teacher: {
          id: student.teacher?.id,
          name: student.teacher?.name,
          grade: student.teacher?.grade,
        },
        parent: {
          id: student.parent?.id,
          name: student.parent?.name,
        },
      }));
    } catch (error) {
      this.logger.error(`Error fetching students for grade ${grade}:`, error);
      throw error;
    }
  }
  async findByCardId(cardId: string) {
    return this.prisma.student.findMany({ where: { cardId: cardId } });
  }
}
