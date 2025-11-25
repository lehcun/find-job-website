import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [UsersModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
