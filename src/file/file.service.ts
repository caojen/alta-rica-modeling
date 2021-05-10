import { HttpException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FsService } from 'src/fs/fs.service';

@Injectable()
export class FileService {
  constructor(
    private readonly dbService: DbService,
    private readonly fsService: FsService
  ) {}

  async getFileContent(fid: number) {
    const sql = `
      select 1 from file where fid=?;
    `;

    const res = await this.dbService.query(sql, [fid]);
    if(res.length === 0) {
      throw new HttpException({
        msg: '没有找到此文件'
      }, 404);
    }

    return this.fsService.getFile(fid);
  }

  async renameFileName(fid: number, filename: string) {
    const sql = `
      update file
      set name=?
      where fid=?;
    `;

    await this.dbService.query(sql, [filename, fid]);
    return {
      msg: '修改文件成功'
    };
  }

  async updateFileContent(fid: number, content: string) {
    this.fsService.updateFile(fid, Buffer.from(content));

    return {
      msg: '修改文件成功'
    };
  }
}
