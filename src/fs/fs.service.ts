import { Injectable } from '@nestjs/common';

import * as fs from 'fs';

@Injectable()
export class FsService {
  private readonly prefix: string = '';
  constructor() {
    this.prefix = './storage'
  }

  getFilePath(filename: string | number): string {
    return `${this.prefix}/${filename}`;
  }

  async getFile(filename: string | number): Promise<Buffer> {
    return fs.readFileSync(this.getFilePath(filename));
  }
  createFile(filename: string | number) {
    fs.writeFileSync(this.getFilePath(filename), '<empty file>');
  }
  updateFile(filename: string | number, content: Buffer) {
    fs.writeFileSync(this.getFilePath(filename), content, { flag: 'w' });
  }
  deleteFile(filename: string | number) {
    fs.unlinkSync(this.getFilePath(filename));
  }
}
