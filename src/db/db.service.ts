import { HttpException, Injectable, Logger } from '@nestjs/common';
import * as mysql from 'mysql2/promise'

function parse(config: any) {
  config.host = process.env[config.host];
  config.port = process.env[config.port];
  config.user = process.env[config.user];
  config.database = process.env[config.database];
  config.password = process.env[config.password];

  return config;
}

@Injectable()
export class DbService {
  private readonly config = {
    host: "MYSQL_HOST",
    port: "MYSQL_PORT",
    user: "MYSQL_USER",
    database: "MYSQL_DATABASE",
    password: "MYSQL_PASSWORD",
    multipleStatements: false,
    connectionLimit: 30,
    waitForConnections: true,
    queueLimit: 0
  };

  private readonly pool: mysql.Pool = null;
  private readonly logger: Logger = new Logger(DbService.name);
  constructor() {
    this.pool = mysql.createPool(parse(this.config));
    this.query('select 1 from project;');
  }

  async query(sql: string, param: any[] = []) {
    try {
      const res = await this.pool.query(sql, param);
      if(sql.trim().substr(0, 6).toLocaleLowerCase() == 'select') {
        return res[0] as any;
      } else {
        return res[0] as any[];
      }
    } catch (exception) {
      this.logger.log(exception);
      throw new HttpException({
        msg: '数据库查询出错',
        e: exception
      }, 500);
    }
  }
}
