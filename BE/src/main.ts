import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { seedAdmin } from './seed/admin.seed';

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  const prisma = app.get(PrismaService);
  await seedAdmin(prisma);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  });

  await app.init();

  return app;
}