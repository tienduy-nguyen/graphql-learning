import { createConnection } from 'typeorm';
import { ormTestConfig } from '../../configs/orm-test.config';

createConnection(ormTestConfig(true)).then(() => process.exit());
