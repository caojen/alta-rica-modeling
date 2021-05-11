import { Controller, Get, Param } from '@nestjs/common';
import { GenerateService } from './generate.service';

@Controller('generate')
export class GenerateController {
  constructor(
    private readonly generateService: GenerateService
  ) {}

  @Get('')
  async generateGet() {
    return this.generateService.generateGet();
  }

  @Get(':pid/model')
  async generateModel(@Param() param: { pid: number }) {
    return this.generateService.generateModel(param.pid);
  }

  @Get(':pid/tree')
  async generateTree(@Param() param: { pid: number }) {
    return this.generateService.generateTree(param.pid);
  }
}
