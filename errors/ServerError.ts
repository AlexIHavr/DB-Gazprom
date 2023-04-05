class ServerError extends Error {
  // eslint-disable-next-line no-unused-vars
  constructor(public status: number, public message: string) {
    super(message);
  }

  static Forbidden(message: string) {
    return new ServerError(403, message);
  }

  static BadRequest(message: string) {
    return new ServerError(400, message);
  }

  static Unauthorized(message: string) {
    return new ServerError(401, message);
  }
}

export default ServerError;
