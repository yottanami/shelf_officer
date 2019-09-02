import { HttpLink, createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://localhost:3434/graphql',
  mode: 'no-cors',
});

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});
