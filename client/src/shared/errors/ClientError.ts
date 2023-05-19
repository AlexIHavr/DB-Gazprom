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

  static DuplicatedHeaders(headers: ExcelRow, fileName: string) {
    return new ClientError(`Есть повторяющиеся заголовки: '${headers.join('; ')}' в таблице '${fileName}'`);
  }

  static EmptyInputValue(inputName: string) {
    return new ClientError(`Есть незаполненное поле - '${inputName}'`);
  }

  static EmptyStartKm(name: string) {
    return new ClientError(`Пустой километраж газопровода в файле ${name}`);
  }
}

export default ClientError;
