import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService
  ) {}

  @Post('')
  async createOneNewProject(@Body() body: { name: string }) {
    return await this.projectService.createOneNewProject(body.name);
  }

  @Get('list')
  async getProjectList() {
    return await this.projectService.getProjectList();
  }

  @Get('tree')
  async getFullTree() {
    return await this.projectService.getFullTree();
  }

  @Get(':pid/files')
  async getSubFiles(@Param() param: { pid: number }) {
    return await this.projectService.getSubFiles(param.pid);
  }

  @Get(':pid/file/new')
  async createOneFileInOneProject(@Param() param: { pid: number }) {
    return await this.projectService.createOneFileInOneProject(param.pid);
  }

  @Delete(':pid/file/:fid')
  async deleteOneFileInOneProject(@Param() param: {
    pid: number,
    fid: number
  }) {
    return await this.projectService.deleteOneFileInOneProject(param.pid, param.fid);
  }

  @Delete(':pid')
  async deleteOneProject(@Param() param: { pid: number }) {
    return await this.projectService.deleteOneProject(param.pid);
  }

  @Put(':pid/name')
  async renameProject(@Param() param: { pid: number }, @Body() body: { name: string }) {
    return await this.projectService.renameProject(param.pid, body.name);
  }
}
