import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ExperienceModule } from './experience/experience.module';
import { ToolModule } from './tool/tool.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'porto',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    AuthModule,
    ExperienceModule,
    ToolModule,
  ],
})
export class AppModule {}