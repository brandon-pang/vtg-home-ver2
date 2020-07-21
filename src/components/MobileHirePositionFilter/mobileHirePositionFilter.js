import React from 'react';

import downArrow from "../../assets/images/acsy/ic_arrow_mid_wh_down.png";

import "./mobileHirePositionFilter.scss";


const RenderActiveMenu = ({ isActiveKor, isActiveSing, isActiveVan, korCount, vanCount, singCount }) => {
  if (isActiveKor) {
    return (<p>Korea ({korCount})</p>)
  } else if (isActiveVan) {
    return (<p>Vancouver ({vanCount})</p>)
  } else if (isActiveSing) {
    return (<p>Singapore ({singCount})</p>)
  }
}

const MobileHirePositionFilter = ({
  openDropdown,
  vanCount,
  singCount,
  korCount,
  isActiveKor,
  isActiveVan,
  isActiveSing,
  dropdownOpen,
  onFilterClick  
}) => {
  return (
    <div className="hire_menu_container">
      <div className="menu_btn" onClick={() => dropdownOpen()}>
        <RenderActiveMenu 
          isActiveKor={isActiveKor} 
          isActiveSing={isActiveSing} 
          isActiveVan={isActiveVan} 
          korCount={korCount} 
          singCount={singCount} 
          vanCount={vanCount}
        />
        <img className="arrow_down" src={downArrow} style={openDropdown ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)' }} alt="arrow down" />
      </div>
      {openDropdown ?
        (
          <div className="menu_list">
            <button
              className="hire_menu_child"
              name="Seoul"
              value={"Seoul"}
              onClick={(e) => onFilterClick(e)}
            >
              Korea ({korCount})
              </button>
            <button
              className="hire_menu_child"
              name="Vancouver"
              value={"Vancouver"}
              onClick={(e) => onFilterClick(e)}
            >
              Vancouver ({vanCount})
              </button>
            <button
              className="hire_menu_child"
              name="Singapore"
              value={"Singapore"}
              onClick={(e) => onFilterClick(e)}
            >
              Singapore ({singCount})
              </button>
          </div>
        ) : null
      }
    </div>
  )
}


export default MobileHirePositionFilter;