import { HttpException, Injectable } from '@nestjs/common';
import { CommandService } from 'src/command/command.service';
import { DbService } from 'src/db/db.service';
import { FsService } from 'src/fs/fs.service';
import * as fs from 'fs';
import * as path from 'path'
import * as process from 'process'

@Injectable()
export class GenerateService {
  constructor(
    private readonly commandService: CommandService,
    private readonly dbService: DbService,
    private readonly fsService: FsService
  ) {}

  getGTSPath(filename: string): string {
    return `./script/gts/${filename}`;
  }

  getPythonPath(filename: string): string {
    return `./script/python/${filename}`;
  }

  getRandomString(length: number = 24) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const len = charset.length;

    let res = '';

    for(let i = 0; i < length; i++) {
      res += charset.charAt(Math.floor(Math.random() * len));
    }
    return res;
  }

  edge2png(origin: string, output: string) {
    const pngfile = `${output}.png`;
    this.commandService.run('cmd', ['/c', path.join(process.cwd(), 'node_modules', '.bin', 'mmdc'), '-i', origin, '-o', pngfile]);
    fs.renameSync(pngfile, output);
  }

  async deleteGTS(pid: number) {
    const sql = `
      delete from file
      where pid = ? and name like '%gts';
    `;

    await this.dbService.query(sql, [pid]);
  }

  async deleteModelPNG(pid: number) {
    const sql = `
      delete from file
      where pid = ? and name like '%model.png';
    `;

    await this.dbService.query(sql, [pid]);
  }

  async getALTFileId(pid: number): Promise<number> {
    const sql = `
      select fid
      from file
      where pid=? and name like '%alt';
    `;

    const res = await this.dbService.query(sql, [pid]);
    if(res.length === 0) {
      return -1;
    } else {
      return res[0].fid;
    }
  }

  async generateGet() {
    // console.log(this.commandService.run('python', [this.getPythonPath('gts-to-pic.py'), './tmp/acs.gts']));
    return ''
  }

  async generateModel(pid: number) {
    const fid = await this.getALTFileId(pid);
    if(fid === -1) {
      throw new HttpException({
        msg: '没有找到alt文件'
      }, 406);
    }
    const ar3c = this.getGTSPath('ar3c.exe');
    const tmpfile = this.getRandomString();
    const gtsfile = `tmp/${tmpfile}-1`;
    this.commandService.run(ar3c, [`storage/${fid}`, '--gts-xml', gtsfile]);

    const gts2pic = this.getPythonPath('gts-to-pic.py');
    const edges = this.commandService.run('python', [gts2pic, gtsfile]);

    // if exists gts file, then, delete that gts file
    await this.deleteGTS(pid);
    // create this file
    const sql = `
      insert into file(name, pid)
      values(?, ?);
    `;

    let res = await this.dbService.query(sql, ['gts.gts', pid]);
    const gts_id = res.insertId;
    this.fsService.createFile(gts_id);
    const gts_content = fs.readFileSync(gtsfile);
    this.fsService.updateFile(gts_id, gts_content);

    const ret = []
    ret.push({
      fid: gts_id,
      name: 'gts.gts'
    });

    // base on edges, construct png file
    const edgefile = `tmp/${tmpfile}-2`;
    fs.writeFileSync(edgefile, `graph TD\n${edges}`);
    const pngfile = `tmp/${tmpfile}-3`;
    this.edge2png(edgefile, pngfile);
    // if exists model.png file, then delete this file
    await this.deleteModelPNG(pid);
    res = await this.dbService.query(sql, ['model.png', pid]);
    const png_id = res.insertId;
    this.fsService.createFile(png_id);
    fs.copyFileSync(pngfile, `storage/${png_id}`);
    ret.push({
      fid: png_id,
      name: 'model.png'
    });
    return ret;
  }

  async generateTree(pid: number) {
    
  }
}
