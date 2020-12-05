import {BaseModel} from '../../base.model';

export interface Product extends BaseModel {
  price: number;
  shortDescription: string;
  imagePath: string;
  name: string;
  EAN: string; // TODO: decide whether to put this in capitals or not
  brand: string;
  detailedDescription: string;
  shippingCost: number;
}
