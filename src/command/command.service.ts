import { HttpException, Injectable } from '@nestjs/common';

import * as child_process from 'child_process';
import * as process from 'process';

@Injectable()
export class CommandService {
  run(command: string, args?: string[]): string {
    const p = child_process.spawnSync(command, args);
    if(p.status !== 0 || p.error || p.stderr.length > 0) {
      throw new HttpException({
        msg: `执行命令出错, 出错信息:\n${p.stdout.toString()}`,
        e: p.error,
        command,
        args,
        stdout: p.stdout.toString(),
        stderr: p.stderr.toString(),
        status: false
      }, 200);
    } else {
      return p.stdout?.toString();
    }
  }
}
