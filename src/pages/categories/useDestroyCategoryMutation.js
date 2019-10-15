import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const mutation = gql`
mutation destroyCategory($input: DestroyCategoryInput!){
          destroyCategory(input: $input) {

          }}
`;

export default () => {
  let [destroyCategory] = useMutation(mutation);
  return destroyCategory;
};
