import React from 'react';

const FilterCategory = ({name, count, onClick, value, style}) => {
  return(
    <button className="category_element" onClick={onClick} value={value} style={style}>
      {name} ({count})
    </button>
  )
}

export default FilterCategory;