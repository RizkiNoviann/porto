import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm'; 
import { seedAdmin } from './seed/admin.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource); 
  await seedAdmin(dataSource);

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(3000);
}
bootstrap();