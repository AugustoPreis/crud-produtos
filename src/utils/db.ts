export function getDBConnection() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_NAME) {
    throw new Error('Configuração do banco inválida');
  }

  return {
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  };
}