import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


const MUT = gql`
mutation createCategory($input: CreateCategoryInput!){
          createCategory(input: $input) {
category{ parentId }
          }}
`;

export default function CreateCategory(props) {
  const [values, setValues] = useState({title: '', body: '', image: '', parentId: 1});
  const [createCategory, { data }] = useMutation(MUT);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createCategory({ variables: {
      input: {
        title: values.title,
        body: values.body,
        parentId: 1,
        image: values.image
      }
    }
                   });
  };


  const handleFileChange = (event) => {
    event.persist();
//    let file = event.target.files[0];
    let image = event.target.files[0];
    let form = new FormData();
    form.append('image', image);
    //setValues(inputs => ({...inputs, image: file}));
    setValues({...values, image: form});
  };

  const handleInputChange = (event) => {
    event.persist();
    setValues(inputs => ({...inputs, [event.target.name]: event.target.value}));
  };

  return (
    <form onSubmit={handleSubmit} >
      <label>
        Title:
        <input
          type="text"
          value={values.title}
          name="title"
          onChange={handleInputChange}
        />
      </label>
      <label>
        Body:
        <input
          type="text"
          value={values.body}
          name="body"
          onChange={handleInputChange}
        />
      </label>

      <label>
        Image:
        <input
          type="file"
          value={values.image}
          name="image"
          onChange={handleFileChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
