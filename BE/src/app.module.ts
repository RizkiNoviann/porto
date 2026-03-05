import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ExperienceModule } from './experience/experience.module';
import { ToolModule } from './tool/tool.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQLHOST || 'localhost',
      port: parseInt(process.env.MYSQLPORT || '3306', 10),
      username: process.env.MYSQLUSER || 'root',
      password: process.env.MYSQLPASSWORD || '',
      database: process.env.MYSQLDATABASE || 'porto',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ExperienceModule,
    ToolModule,
    ProjectModule,
  ],
})
export class AppModule {}