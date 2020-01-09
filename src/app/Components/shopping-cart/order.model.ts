import {BaseModel} from '../../base.model';

export interface Order extends BaseModel {
  consumerId: number;
  productId: number;
  productName: string;
}
