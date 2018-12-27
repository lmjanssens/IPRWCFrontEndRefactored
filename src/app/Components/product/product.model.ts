export class Product {
  public price: number;
  public description: string;
  public imagePath: string;

  constructor(price: number, description: string, imagePath: string) {
    this.price = price;
    this.description = description;
    this.imagePath = imagePath;
  }
}
