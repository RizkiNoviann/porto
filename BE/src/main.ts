Rizki Novian\porto\BE\src\main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedAdmin } from './seed/admin.seed';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const dataSource = app.get(DataSource);
  await seedAdmin(dataSource);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Server running on port ${port}`);
}
bootstrap();