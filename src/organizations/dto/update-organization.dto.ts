import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-organization.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}
