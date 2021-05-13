import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      msg: 'Hello, it seems that you are accessing the apis directly.'
    }
  }
}
