import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {

  constructor(
    private readonly fileService: FileService
  ) {}

  @Get(':fid')
  async getFileContent(@Param() param: { fid: number }, @Res() r: Response) {
    const res = await this.fileService.getFileContent(param.fid)
    if(res.ext !== 'png') {
      r.send(res.buffer.toString());
    } else {
      r.setHeader('content-type', 'application/x-png')
      r.send(res.buffer);
    }
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
