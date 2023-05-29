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

  static InvalidTableTypeName() {
    return new ClientError(`Неверный тип таблицы ВТД`);
  }

  static DuplicatedHeaders(headers: ExcelRow, fileName: string) {
    return new ClientError(`Есть повторяющиеся заголовки: '${headers.join('; ')}' в таблице '${fileName}'`);
  }

  static EmptyInputValues(inputNames: string[]) {
    return new ClientError(`Есть незаполненные поля - '${inputNames.join('; ')}'`);
  }

  static EmptyStartKm(name: string) {
    return new ClientError(`Пустой километраж газопровода в файле ${name}`);
  }

  static WorkSheetNotFound(name: string) {
    return new ClientError(`Лист '${name} не найден'`);
  }
}

export default ClientError;
