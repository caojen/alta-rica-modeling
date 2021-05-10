import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ProjectModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
