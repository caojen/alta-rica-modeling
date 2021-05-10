import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FsService } from 'src/fs/fs.service';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService, DbService, FsService]
})
export class FileModule {}
