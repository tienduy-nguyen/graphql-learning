export function ormConfig(): any {
  return {
    type: 'postgres',
    name: 'default',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'net_todo',
    entities: ['src/modules/**/*.model.ts'],
    logging: false,
    synchronize: true,
    migrations: ['src/common/migrations/**/*.ts'],
    cli: {
      migrationsDir: 'src/common/migrations',
    },
  };
}
