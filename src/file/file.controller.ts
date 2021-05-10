import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {

  constructor(
    private readonly fileService: FileService
  ) {}

  @Get(':fid')
  async getFileContent(@Param() param: { fid: number }) {
    return this.fileService.getFileContent(param.fid)
  }

  @Put(':fid/name')
  async renameFileName(@Param() param: { fid: number }, @Body() body: { name: string }) {
    return this.fileService.renameFileName(param.fid, body.name);
  }

  @Post(':fid')
  async updateFileContent(@Param() param: { fid: number }, @Body() body: { content: string }) {
    return this.fileService.updateFileContent(param.fid, body.content);
  }
}
