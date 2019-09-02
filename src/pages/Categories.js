import React from 'react';
import useCategoriesQuery from './useCategoriesQuery';


const Categories = () => {
  let { data } = useCategoriesQuery();
  if (!data || !data.categories) return <h3>Error!</h3>;
    return data.categories.map(category => (
      <div key={category.id}>
      <h3>{category.id}</h3>
      <h3>{category.title}</h3>
      <h3>{category.image.thumb.url}</h3>

    </div>
  ));
};

export default Categories;
