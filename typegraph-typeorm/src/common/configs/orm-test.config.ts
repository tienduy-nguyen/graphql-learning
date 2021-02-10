export function ormTestConfig(drop: boolean = false): any {
  return {
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
    drop: drop,
  };
}
