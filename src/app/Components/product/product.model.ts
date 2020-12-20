import {BaseModel} from '../../base.model';

export interface Product extends BaseModel {
  price: number;
  shortDescription: string;
  imagePath: string;
  name: string;
  EAN: string;
  brand: string;
  detailedDescription: string;
  shippingCost: number;
}
