import { Module } from '@nestjs/common';
import { OrganizationService as OrganizationService } from './organization.service';
import { ClientsController as OrganizationController } from './organization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organization,
  organizationSchema,
} from './entities/organization.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: organizationSchema },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
