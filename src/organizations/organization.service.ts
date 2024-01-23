import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto as CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateClientDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { ClientDto as OrganizationDto } from './dto/organization.dto';
import { SuccessResponse } from 'src/shared/utilities/response';
import { Message } from 'src/shared/enum/messages';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationRepo: Model<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      const { email } = createOrganizationDto || {};
      let organization: Organization;

      organization = await this.findByEmail(email);
      if (organization)
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);

      organization = await this.organizationRepo.create({
        ...createOrganizationDto,
      });
      return new SuccessResponse(
        Message.CREATED,
        HttpStatus.CREATED,
        new OrganizationDto(organization),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail(email: string): Promise<Organization> {
    const organization = await this.organizationRepo
      .findOne<Organization>({ email })
      .exec();
    return organization;
  }

  async findAll() {
    const organizations = await this.organizationRepo
      .find<Organization>()
      .populate({ path: 'users', model: 'User' })
      .exec();
    return new SuccessResponse(Message.FETCHED, HttpStatus.OK, organizations);
  }

  async findOne(id: string) {
    const organization = await this.organizationRepo.findById<Organization>(id);
    return organization;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const organization: Organization = await this.findOne(id);
      if (!organization)
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);

      if (
        'email' in updateClientDto &&
        updateClientDto.email !== organization.email
      ) {
        const existingClient = await this.findByEmail(updateClientDto.email);
        if (existingClient) {
          throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        }
      }

      const data = await this.organizationRepo.updateOne(updateClientDto, {
        where: { id: id },
        returning: true,
      });
      return data;
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: string) {
    try {
      const client = this.organizationRepo.deleteOne({ id });
      return new SuccessResponse(
        'Record deleted Successfully',
        HttpStatus.OK,
        client,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
