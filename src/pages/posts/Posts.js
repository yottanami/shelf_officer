import React from 'react';
import usePostsQuery from './usePostsQuery';



const Posts = (props) => {
  const categoryId = props.match.params.categoryId;
  let { data } = usePostsQuery({id: categoryId});
  if (!data || !data.posts) return <h3>Error!</h3>;
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    LIST OF Posts
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
                      {data.posts.map((book, index) => (
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

export default Posts;
