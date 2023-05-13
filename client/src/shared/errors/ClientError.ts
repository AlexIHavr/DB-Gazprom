import { ExcelRow } from 'shared/types/excel';

class ClientError extends Error {
  constructor(public message: string) {
    super(message);
  }

  static InvalidFileName(name: string) {
    return new ClientError(`Неверное имя файла '${name}'`);
  }

  static InvalidFileFormat() {
    return new ClientError('Неверный формат файла');
  }

  static DuplicatedHeaders(headers: ExcelRow) {
    return new ClientError(`Есть повторяющиеся заголовки: ${headers.join('; ')}`);
  }

  static EmptyInputValue(inputName: string) {
    return new ClientError(`Есть незаполненное поле - '${inputName}'`);
  }
}

export default ClientError;
