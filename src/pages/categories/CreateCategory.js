import React, { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const GET_CATS = gql`
{
    categories {
        id
        name
    }
}
`;


const MUT = gql`
mutation createCategory($input: CreateCategoryInput!){
          createCategory(input: $input) {
category{ id, title }
          }}
`;

class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.titleRef = React.createRef();
    this.bodyRef = React.createRef();
    this.imageFileRef = React.createRef();
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={MUT}
          update={(cache, { data: { addCategory } }) => {
            try {
              const { categories } = cache.readQuery({ query: GET_CATS });
              cache.writeQuery({
                query: GET_CATS,
                data: { categories: categories.concat([{ ...addCategory, likes: 0 }]) }
              });
            } catch (e) {
            } finally {
              //setLoadingState(false);
            }
          }
                 }
        >
          {(createCategory) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();

                  const variables = {
                    body: this.bodyRef.current.value,
                    title: this.titleRef.current.value,
                    image: this.imageFileRef.current.files[0],
                    parentId: 1
                  };
                  createCategory({ variables: {
                    input: {
                      title: this.titleRef.current.value,
                      image: this.imageFileRef.current.files[0],
                      body: this.bodyRef.current.value,
                      parentId: 1
                    }

                  } }).then(({ data: { createCategory } }) => {
                    this.titleRef.current.value = '';
                    this.bodyRef.current.value = '';
                    this.imageFileRef.current.value = null;

                  });
                }}
              >
                <input type="text" name="title" ref={this.titleRef} />
                <input type="text" name="body" ref={this.bodyRef} />
                <input type="file" name="imageFile" ref={this.imageFileRef} />

                <button type="submit">Create Category</button>
              </form>

              <div>
              </div>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateCategory;
