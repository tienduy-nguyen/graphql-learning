import faker from 'faker';
import { User } from '../user.model';
import { gCall } from '@common/utils/test-utils/g-call';
import { Connection, createConnection } from 'typeorm';
import { ormTestConfig } from '@common/configs/orm-test.config';

let conn: Connection;
beforeAll(async () => {
  conn = await createConnection(ormTestConfig());
});
afterAll(async () => {
  await conn.close();
});

const meQuery = `
 {
  me {
    id
    firstName
    lastName
    email
    fullName
  }
}
`;

describe('Me', () => {
  it('get user', async () => {
    const user = await User.create({
      username: faker.name.firstName(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  });

  it('return null', async () => {
    const response = await gCall({
      source: meQuery,
    });

    expect(response).toMatchObject({
      data: null,
    });
  });
});
