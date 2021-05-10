import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { DbModule } from './db/db.module';
import { FsModule } from './fs/fs.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [ProjectModule, DbModule, FsModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
