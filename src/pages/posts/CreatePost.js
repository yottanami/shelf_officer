import React, { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';


const MUT = gql`
mutation createPost($input: CreatePostInput!){
          createPost(input: $input) {
post{ id, title }
          }}
`;

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.titleRef = React.createRef();
    this.bodyRef = React.createRef();
    this.categoryIdRef = React.createRef();
    this.imageFileRef = React.createRef();
    this.videoFileRef = React.createRef();
  }

  render() {
    return (
      <div>
        <Mutation mutation={MUT}>
          {(createPost) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();

                  const variables = {
                    body: this.bodyRef.current.value,
                    title: this.titleRef.current.value,
                    categoryId: this.categoryIdRef.current.value,
                    image: this.imageFileRef.current.files[0],
                    video: this.videoFileRef.current.files[0],
                  };
                  createPost({ variables: {
                    input: {
                      title: this.titleRef.current.value,
                      categoryId: this.categoryIdRef.current.value,
                      image: this.imageFileRef.current.files[0],
                      video: this.videoFileRef.current.files[0],
                      body: this.bodyRef.current.value,

                    }

                  } }).then(({ data: { createPost } }) => {
                    this.titleRef.current.value = '';
                    this.bodyRef.current.value = '';
                    this.categoryIdRef.current.value = '';
                    this.imageFileRef.current.value = null;
                    this.videoFileRef.current.value = null;

                  });
                }}
              >
                <input type="text" name="title" ref={this.titleRef} />
                <input type="text" name="body" ref={this.bodyRef} />
                <input type="text" name="categoryId" ref={this.categoryIdRef} />
                <input type="file" name="imageFile" ref={this.imageFileRef} />
                <input type="file" name="videoFile" ref={this.videoFileRef} />

                <button type="submit">Create Post</button>
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

export default CreatePost;
