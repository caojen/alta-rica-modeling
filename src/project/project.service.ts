import { HttpException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FsService } from 'src/fs/fs.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly dbService: DbService,
    private readonly fsService: FsService
  ) {}

  async getProjectList() {
    const sql = 'select pid, name from project';
    return await this.dbService.query(sql);
  }

  async getSubFiles(pid: number) {
    const sql = `
      select file.fid as fid, file.name as name
      from file
        left join project on file.pid = project.pid
      where project.pid=?;
    `;

    return await this.dbService.query(sql, [pid]);
  }

  async getFullTree() {
    const projects = await this.getProjectList();
    const ret = [];
    for(const project of projects) {
      const pid = project.pid;
      project.files = await this.getSubFiles(pid);
      ret.push(project);
    }

    return ret;
  }

  async createOneNewProject(name: string) {
    const sql = `
      insert into project(name)
      values(?);
    `;

    const res = await this.dbService.query(sql, [name]);
    return {
      pid: res.insertId,
      name
    };
  }

  async createOneFileInOneProject(pid: number) {
    const sql = `
      insert into file(pid)
      values(?);
    `;

    const res = await this.dbService.query(sql, [pid]);
    const fid = res.insertId;
    try {
      this.fsService.createFile(fid);
      return {
        fid,
        name: 'untitled'
      }
    } catch (err) {
      const sql = `
        delete from file
        where fid=?;
      `
      await this.dbService.query(sql, [fid]);
      throw new HttpException({
        msg: '从磁盘中创建文件失败',
        e: err
      }, 500);
    }
  }

  async deleteOneFileInOneProject(pid: number, fid: number) {
    const sql = `
      delete from file
      where pid=? and fid=?;
    `;

    await this.dbService.query(sql, [pid, fid]);
    return {
      msg: '删除文件成功'
    }
  }

  async deleteOneProject(pid: number) {
    const sql = `
      delete from project
      where pid=?;
    `;

    await this.dbService.query(sql, [pid]);
    return {
      msg: '删除项目成功'
    }
  }

  async renameProject(pid: number, name: string) {
    const sql = `
      update project
      set name=?
      where pid=?;
    `;

    await this.dbService.query(sql, [name, pid]);
    return {
      msg: '修改成功'
    }
  }
}
