import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ExperienceModule } from './experience/experience.module';
import { ToolModule } from './tool/tool.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ExperienceModule,
    ToolModule,
    ProjectModule,
  ],
})
export class AppModule {}