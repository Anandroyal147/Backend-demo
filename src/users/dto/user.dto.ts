import { User } from './../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly userName: string;

  @ApiProperty()
  readonly role: string;

  constructor(user: User) {
    this.email = user.email;
    this.userName = user.userName;
    this.role = user.role;
    this.id = user.id;
  }
}
