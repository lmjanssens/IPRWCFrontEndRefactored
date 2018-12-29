export class Product {
  public price: number;
  public description: string;
  public imagePath: string;
  public name: string;

  constructor(price: number, description: string, imagePath: string, name: string) {
    this.price = price;
    this.description = description;
    this.imagePath = imagePath;
    this.name = name;
  }
}
