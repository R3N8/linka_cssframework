export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);

    this.name = "ApiError";
    this.status = status;

    // Fix prototype chain
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}