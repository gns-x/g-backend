import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { CLoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    const { accessCode, role } = loginDto;

    if (role === 'PARENT') {
      const parent = await this.prisma.parent.findUnique({
        where: { accessCode },
        include: { students: true },
      });

      if (!parent) {
        throw new UnauthorizedException('Invalid parent access code');
      }

      return {
        success: true,
        user: {
          id: parent.id,
          name: parent.name,
          role: 'PARENT',
        },
      };
    }

    if (role === 'TEACHER') {
      const teacher = await this.prisma.teacher.findUnique({
        where: { accessCode },
        include: { students: true },
      });

      if (!teacher) {
        throw new UnauthorizedException('Invalid teacher access code');
      }

      return {
        success: true,
        user: {
          id: teacher.id,
          name: teacher.name,
          role: 'TEACHER',
          grade: teacher.grade,
        },
      };
    }

    throw new UnauthorizedException('Invalid role specified');
  }

  async clogin(loginDto: CLoginDto) {
    try {
      const { email, password } = loginDto;
      const JWT_SECRET = 'fuckfuckfuckfuckfuck';

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '8h' },
      );

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error) {
      console.log('Login Error : ', error);
      throw new UnauthorizedException('Internal Server Error');
    }
  }
}
