import { Get, Module } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { GenerateController } from './generate.controller';
import { CommandService } from 'src/command/command.service';

@Module({
  providers: [GenerateService, CommandService],
  controllers: [GenerateController]
})
export class GenerateModule {}
