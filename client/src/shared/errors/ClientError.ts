import { ExcelRow } from 'shared/types/excel';

class ClientError extends Error {
  constructor(public message: string) {
    super(message);
  }

  static InvalidFileFormat() {
    return new ClientError('Неверный формат файла');
  }

  static DuplicatedHeaders(headers: ExcelRow) {
    return new ClientError(`Есть повторяющиеся заголовки: ${headers.join('; ')}`);
  }
}

export default ClientError;
