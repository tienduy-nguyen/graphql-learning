import { createConnectionTesting } from '@common/utils/test-utils/create-connection-testing';
import faker from 'faker';
import { User } from '../user.model';
import { gCall } from '@common/utils/test-utils/g-call';

let conn;
beforeAll(async () => {
  conn = await createConnectionTesting();
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
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
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
      data: {
        me: null,
      },
    });
  });
});
