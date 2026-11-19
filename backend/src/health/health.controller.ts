import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface HealthStatus {
  status: 'ok' | 'error';
  database: 'ok' | 'error';
}

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  // Comprueba que el backend responde y que la base de datos acepta consultas.
  @Get()
  async check(): Promise<HealthStatus> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', database: 'ok' };
    } catch {
      return { status: 'error', database: 'error' };
    }
  }
}
