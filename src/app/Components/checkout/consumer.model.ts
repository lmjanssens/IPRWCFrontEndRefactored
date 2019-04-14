import {BaseModel} from '../../base.model';

export interface Consumer extends BaseModel {
  postalCode: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  email: string;
  town: string;
}
