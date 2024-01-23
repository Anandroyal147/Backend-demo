/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from './create-organization.dto';

export class ClientDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  constructor(client: CreateClientDto) {
    this.email = client.email;
    this.phone = client.phone;
  }
}
