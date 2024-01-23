import { ConfigService } from './../shared/config/config.service';
import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'MONGOOSE_CONNECTION',
    useFactory: async (configService: ConfigService) => {
      console.log('--------->', configService.sequelizeOrmConfig.mongoUri);

      return await mongoose.connect(configService.sequelizeOrmConfig.mongoUri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
    },
    inject: [ConfigService],
  },
];
