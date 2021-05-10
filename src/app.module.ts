import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { DbModule } from './db/db.module';
import { FsModule } from './fs/fs.module';
import { FileModule } from './file/file.module';
import { CommandModule } from './command/command.module';
import { GenerateModule } from './generate/generate.module';

@Module({
  imports: [ProjectModule, DbModule, FsModule, FileModule, CommandModule, GenerateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
