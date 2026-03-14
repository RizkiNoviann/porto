import serverlessExpress from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';

// Import pre-compiled output to avoid esbuild decorator metadata issues
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { AppModule } = require('../dist/src/app.module');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaService } = require('../dist/src/prisma/prisma.service');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { seedAdmin } = require('../dist/src/seed/admin.seed');

let server: ReturnType<typeof serverlessExpress>;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prisma = app.get(PrismaService);
  await seedAdmin(prisma);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  });

  await app.init();
  const express = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: express });
}

export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
}
