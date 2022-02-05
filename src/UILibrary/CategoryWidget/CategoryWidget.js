import React from 'react';

const CategoryWidget = ({ category }) => {
  return (
    <div className="text-xl category bg-white text-black rounded-full px-4 py-2 inline-block ">
      {category}
    </div>
  );
};
export default CategoryWidget;
