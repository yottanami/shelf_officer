import React from 'react';
import useCategoriesQuery from './useCategoriesQuery';
import { Link } from "react-router-dom";
import DestroyCategory from './DestroyCategory';


const Categories = () => {
  const deleteCategory = (id) => {

  };


  let { data } = useCategoriesQuery();
  if (!data || !data.categories) return <h3>Error!</h3>;

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            List of categories
          </h3>

        </div>
        <div className="panel-body">
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.categories.map((category, index) => (
                <tr key={index}>

                  <td>{category.title}</td>
                  <td>
                    <Link to={`/posts/${category.id}`}>Posts</Link>
                  </td>
                  <td>
                    <DestroyCategory id={category.id}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
