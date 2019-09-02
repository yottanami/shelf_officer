import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const mutation = gql`
mutation createCategory($input: CreateCategoryInput!){
          createCategory(input: $input) {
category{ parentId }
          }}
`;

export default () => {
  let [createCategory] = useMutation(mutation);
  return createCategory;
};
