export class NotImplementedError extends Error {
  constructor(message: string) {
    super(message);

    // assign the error class name
    this.name = NotImplementedError.name;
  }
}
