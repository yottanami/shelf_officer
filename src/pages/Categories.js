import React from 'react';
import useCategoriesQuery from './useCategoriesQuery';



const Categories = () => {
  let { data } = useCategoriesQuery();
  if (!data || !data.categories) return <h3>Error!</h3>;
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    LIST OF BOOKS
                  </h3>

                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.categories.map((book, index) => (
                        <tr key={index}>

                          <td>{book.title}</td>
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
