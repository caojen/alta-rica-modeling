import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FsService } from 'src/fs/fs.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, DbService, FsService]
})
export class ProjectModule {}
