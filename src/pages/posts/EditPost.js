import React, { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';


const MUT = gql`
mutation editCategory($input: EditCategoryInput!){
          editCategory(input: $input) {
category{ id, title }
          }}
`;

class EditCategory extends Component {
  constructor(props) {
    super(props);

    this.titleRef = React.createRef();
    this.bodyRef = React.createRef();
    this.imageFileRef = React.createRef();
  }

  render() {
    return (
      <div>
        <Mutation mutation={MUT}>
          {(editCategory) => (
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
                  editCategory({ variables: {
                    input: {
                      title: this.titleRef.current.value,
                      image: this.imageFileRef.current.files[0],
                      body: this.bodyRef.current.value,
                      parentId: 1
                    }

                  } }).then(({ data: { editCategory } }) => {
                    this.titleRef.current.value = '';
                    this.bodyRef.current.value = '';
                    this.imageFileRef.current.value = null;

                  });
                }}
              >
                <input type="text" name="title" ref={this.titleRef} />
                <input type="text" name="body" ref={this.bodyRef} />
                <input type="file" name="imageFile" ref={this.imageFileRef} />

                <button type="submit">Edit Category</button>
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

export default EditCategory;
