import { Injectable } from '@nestjs/common';
import config from '../../../config';
import crypto from 'crypto';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig(): any {
    return config.database;
  }

  get jwtConfig() {
    return { privateKey: config.jwtPrivateKey };
  }
  generateSecretKey() {
    return crypto.randomBytes(32).toString('hex');
  }
}
