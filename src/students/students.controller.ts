import { Controller, Get, Patch, Param, Body, Logger } from '@nestjs/common';
import { StudentsService } from './students.service';
import { UpdateStudentStatusDto } from './dto/update-student-status.dto';

@Controller('students')
export class StudentsController {
  private readonly logger = new Logger(StudentsController.name);

  constructor(private readonly studentsService: StudentsService) {}

  @Get('card/:cardId')
  findByCardId(@Param('cardId') cardId: string) {
    return this.studentsService.findByCardId(cardId);
  }

  @Patch(':studentId/status')
  async updateStatus(
    @Param('studentId') studentId: string,
    @Body() updateStatusDto: UpdateStudentStatusDto,
  ) {
    this.logger.log(`Updating status for student ${studentId}`);
    return this.studentsService.updateStatus(studentId, updateStatusDto);
  }

  @Get('grade/:grade')
  async getStudentsByGrade(@Param('grade') grade: string) {
    this.logger.log(`Getting students for grade ${grade}`);
    try {
      const result = await this.studentsService.getStudentsByGrade(grade);
      this.logger.log(`Found ${result.length} students in grade ${grade}`);
      return result;
    } catch (error) {
      this.logger.error(`Error getting students for grade ${grade}:`, error);
      throw error;
    }
  }

  @Get(':userId/:role')
  async getStudentsByUser(
    @Param('userId') userId: string,
    @Param('role') role: string,
  ) {
    this.logger.log(`Getting students for user ${userId} with role ${role}`);
    return this.studentsService.getStudentsByUser(userId, role);
  }
}
