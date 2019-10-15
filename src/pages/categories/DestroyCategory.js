import React from "react";
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
//import useCategoriesQuery from './useCategoriesQuery';

const GET_CATS = gql`
  query Categories {
    categories {
      title,
      image,
id
    }
  }
`;

const DELETE_CATS = gql`
mutation destroyCategory($input: DestroyCategoryInput!){
          destroyCategory(input: $input) {
category{ title }
          }}
`;

const DestroyCategory = ({id}) => {
  id = parseInt(id);
  return (
    <Mutation
      mutation={DELETE_CATS}
      update={(cache, { data: { destroyCategory } }) => {
        const {categories} = cache.readQuery({ query: GET_CATS });
        cache.writeQuery({
          query: GET_CATS,
          data: { categories: categories.filter(e => e.id !== id)}
        });

      }}
    >
      {(destroyCategory, { data }) => (
        <button
          onClick={e => {
            destroyCategory({
              variables: {
                input: {
                  id
                }
              }
            });
          }}
        >Delete</button>
      )}
    </Mutation>
  );
};

export default DestroyCategory;
