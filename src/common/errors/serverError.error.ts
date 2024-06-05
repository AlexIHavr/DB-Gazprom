import { HttpException, HttpStatus } from '@nestjs/common';

export class ServerError extends HttpException {
  public static NotFoundVtd(): ServerError {
    return new ServerError('Vtd was not found', HttpStatus.NOT_FOUND);
  }

  public static NotFoundColumn(columnName: string): ServerError {
    return new ServerError(`'${columnName}' was not found`, HttpStatus.NOT_FOUND);
  }

  public static NoDataInVtdTable(vtdTableName: string): ServerError {
    return new ServerError(`Vtd table '${vtdTableName}' has no data`, HttpStatus.NOT_FOUND);
  }

  public static ExistsVtdTable(vtdTableName: string): ServerError {
    return new ServerError(`Vtd table '${vtdTableName}' already exists`, HttpStatus.BAD_REQUEST);
  }

  public static ExistsVtd(): ServerError {
    return new ServerError('Current Vtd already exists', HttpStatus.BAD_REQUEST);
  }

  public static InvalidCountVtdData(fromTableName: string, toTableName: string): ServerError {
    return new ServerError(
      `Count of ${fromTableName} does not equal count of ${toTableName}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
