import { Injectable } from '@nestjs/common';
import { CommandService } from 'src/command/command.service';

@Injectable()
export class GenerateService {
  constructor(
    private readonly commandService: CommandService
  ) {}

  getGTSPath(filename: string): string {
    return `./script/gts/${filename}`;
  }

  getPythonPath(filename: string): string {
    return `./script/python/${filename}`;
  }

  async generateGet() {
    // console.log(this.commandService.run('python', [this.getPythonPath('gts-to-pic.py'), './tmp/acs.gts']));
    return ''
  }

  async generateModel(pid: number) {

  }

  async generateTree(pid: number) {
    
  }
}
