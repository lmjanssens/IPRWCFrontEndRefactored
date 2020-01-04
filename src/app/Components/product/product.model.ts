import {BaseModel} from '../../base.model';

export interface Product extends BaseModel {
  price: number;
  description: string;
  imagePath: string;
  name: string;
  ean: string;
  brand: string;
  detailedDescription: string;
  shippingCost: number;
}
