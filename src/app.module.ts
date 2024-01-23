import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrganizationModule } from './organizations/organization.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './shared/config/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.sequelizeOrmConfig.mongoUri,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
