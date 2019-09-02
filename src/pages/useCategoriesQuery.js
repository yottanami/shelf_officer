import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const query = gql`
  query Categories {
    categories {
      title,
      image,
id
    }
  }
`;

export default () => useQuery(query);
