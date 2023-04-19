class ClientError extends Error {
  constructor(public message: string) {
    super(message);
  }

  static InvalidFormat() {
    return new ClientError('Неверный формат файла');
  }

  static InvalidColumns(columns: string[]) {
    return new ClientError(`Отсутствуют обязательные колонки: '${columns.join('; ')}'`);
  }
}

export default ClientError;
