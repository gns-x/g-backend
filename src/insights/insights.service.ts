import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InsightsService {
  constructor(private prisma: PrismaService) {}

  async getInsights() {
    const totalStudents = await this.prisma.student.count();
    const withCanteen = await this.prisma.student.count({
      where: {
        Subscription: {
          some: {
            type: 'ANNUAL',
          },
        },
      },
    });
    const withGardeRepas = await this.prisma.student.count({
      where: {
        Subscription: {
          some: {
            type: 'TERM',
          },
        },
      },
    });

    const recentTransactions = await this.prisma.transaction.groupBy({
      by: ['productId'],
      _count: {
        productId: true,
      },
      orderBy: {
        _count: {
          productId: 'desc',
        },
      },
      take: 3,
    });

    return {
      totalStudents,
      withCanteen,
      withGardeRepas,
      withoutSubscription: totalStudents - (withCanteen + withGardeRepas),
      recentTransactions,
    };
  }
}
