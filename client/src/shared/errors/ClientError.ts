import { ExcelRow } from 'shared/types/excel';

class ClientError extends Error {
  constructor(public message: string) {
    super(message);
  }

  public static InvalidFileName(name: string): ClientError {
    return new ClientError(`Неверное имя файла '${name}'`);
  }

  public static InvalidFileFormat(): ClientError {
    return new ClientError('Неверный формат файла');
  }

  public static InvalidTableTypeName(): ClientError {
    return new ClientError(`Неверный тип таблицы ВТД`);
  }

  public static DuplicatedHeaders(headers: ExcelRow, fileName: string): ClientError {
    return new ClientError(
      `Есть повторяющиеся заголовки: '${headers.join('; ')}' в таблице '${fileName}'`,
    );
  }

  public static EmptyInputValues(inputNames: string[]): ClientError {
    return new ClientError(`Есть незаполненные поля - ${inputNames.join('; ')}`);
  }

  public static EmptyStartKm(name: string): ClientError {
    return new ClientError(`Пустой километраж газопровода в файле ${name}`);
  }

  public static PrevVtdNotFound(): ClientError {
    return new ClientError('Предыдущее ВТД для данного газопровода не найдено');
  }

  public static WorkSheetNotFound(name: string): ClientError {
    return new ClientError(`Лист '${name} не найден'`);
  }
}

export default ClientError;
