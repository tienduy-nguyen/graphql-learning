import { createConnection } from 'typeorm';

export const createConnectionTesting = async (drop: boolean = false) => {
  return await createConnection({
    type: 'postgres',
    name: 'default',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'typegraphql_test',
    entities: ['src/modules/**/*.model.ts'],
    logging: false,
    synchronize: drop,
    dropSchema: drop,
  });
};
