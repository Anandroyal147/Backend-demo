/* eslint-disable prettier/prettier */
import { Organization } from './entities/organization.entity';
export const clientsProviders = [
  { provide: 'ClientsRepository', useValue: Organization },
];
