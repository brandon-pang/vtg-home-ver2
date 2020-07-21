import React from 'react';
import Category from "./common/filterCategory";
import "./hirePositionFilter.scss";


const HirePositionFilter = ({
  vanCount,
  singCount,
  korCount,
  isActiveKor,
  isActiveVan,
  isActiveSing,
  onFilterClick 
}) => {
  return (
    <div className="filter_container">
      <Category
        name="Seoul"
        count={korCount}
        value="Seoul"
        onClick={(e) => onFilterClick(e)}
        style={isActiveKor ? activeStyle : null}
      />
      <Category
        name="Vancouver"
        count={vanCount}
        value="Vancouver"
        onClick={(e) => onFilterClick(e)}
        style={isActiveVan ? activeStyle : null}
      />
      <Category
        name="Singapore"
        count={singCount}
        value="Singapore"
        onClick={(e) => onFilterClick(e)}
        style={isActiveSing ? activeStyle : null}
      />
    </div>
  )
}

const activeStyle = {
  color: '#fff',
  background: '#1c1c1c'
}

export default HirePositionFilter;