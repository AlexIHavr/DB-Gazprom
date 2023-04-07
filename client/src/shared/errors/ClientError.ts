class ClientError extends Error {
  constructor(public message: string) {
    super(message);
  }

  static InvalidFormat() {
    return new Error('Неверный формат файла');
  }

  static InvalidColumns(columns: string[]) {
    return new Error(`Отсутствуют обязательные колонки: '${columns.join('; ')}'`);
  }
}

export default ClientError;
