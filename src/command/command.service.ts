import { HttpException, Injectable } from '@nestjs/common';

import * as child_process from 'child_process';
import * as process from 'process';

@Injectable()
export class CommandService {
  run(command: string, args?: string[]): string {
    console.log(command, args);
    const p = child_process.spawnSync(command, args);
    if(p.error) {
      throw new HttpException({
        msg: '执行命令出错',
        e: p.error,
        command,
        args
      }, 500);
    } else {
      return p.stdout?.toString();
    }
  }
}
