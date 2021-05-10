import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { DbModule } from './db/db.module';
import { FsModule } from './fs/fs.module';

@Module({
  imports: [ProjectModule, DbModule, FsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
