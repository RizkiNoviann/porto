import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ExperienceModule } from './experience/experience.module';

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
  ],
})
export class AppModule {}