import { Injectable } from '@nestjs/common';

import * as child_process from 'child_process';

@Injectable()
export class CommandService {
  run(command: string, args?: string[]): string {
    return child_process.spawnSync(command, args).output.toString();
  }
}
