import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
//const categoryId = this.props.navigation.getParam('categoryId', 0);

export const query = gql`
  query Posts($categoryId: ID!) {
    posts(categoryId: $categoryId) {
    id,
    title,
    body,
    image
    }
  }
`;

export default (props) => useQuery(query, {
  variables: { categoryId: String(props.id) },
  });
