import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from './../database/database.module';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';
import { ConfigService } from 'src/shared/config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.entity';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
