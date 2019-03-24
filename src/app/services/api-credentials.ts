export class ApiCredentials {
  constructor(private username: string, private password: string) {
  }

  public toHeader(): string {
    return `Basic ${btoa(`${this.username}:${this.password}`)}`;
  }
}
