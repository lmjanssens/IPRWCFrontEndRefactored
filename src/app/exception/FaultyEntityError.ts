export class FaultyEntityError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FaultyEntityError';
  }
}
