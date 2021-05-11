import { Get, Module } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { GenerateController } from './generate.controller';
import { CommandService } from 'src/command/command.service';
import { DbService } from 'src/db/db.service';
import { FsService } from 'src/fs/fs.service';

@Module({
  providers: [GenerateService, CommandService, DbService, FsService],
  controllers: [GenerateController]
})
export class GenerateModule {}
