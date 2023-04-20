import { HttpException, HttpStatus } from '@nestjs/common';

export class ServerError extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }

  static NotFoundVtd() {
    return new ServerError('Vtd was not found', HttpStatus.NOT_FOUND);
  }

  static NotFoundColumn(columnName: string) {
    return new ServerError(`'${columnName}' was not found`, HttpStatus.NOT_FOUND);
  }

  static ExistsVtdTable(vtdTableName: string) {
    return new ServerError(`Vtd table '${vtdTableName}' already exists`, HttpStatus.BAD_REQUEST);
  }
}
