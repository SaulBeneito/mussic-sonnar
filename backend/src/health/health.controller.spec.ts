import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  async function crear(queryRaw: () => Promise<unknown>) {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: PrismaService, useValue: { $queryRaw: queryRaw } }],
    }).compile();
    return moduleRef.get(HealthController);
  }

  it('responde ok cuando la base de datos contesta', async () => {
    const controller = await crear(vi.fn().mockResolvedValue([{ '?column?': 1 }]));
    await expect(controller.check()).resolves.toEqual({ status: 'ok', database: 'ok' });
  });

  it('responde error cuando la base de datos falla', async () => {
    const controller = await crear(vi.fn().mockRejectedValue(new Error('sin conexión')));
    await expect(controller.check()).resolves.toEqual({ status: 'error', database: 'error' });
  });
});
