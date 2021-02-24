// tests RESTful requests. there's also a GraphQL one
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import 'whatwg-fetch';

const server = setupServer(
  rest.get('/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ greeting: 'hello world' }));
  })
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

async function onRoot() {
  const result = await fetch('/');
  const data = await result.json();
  return data;
}

export { server, rest };