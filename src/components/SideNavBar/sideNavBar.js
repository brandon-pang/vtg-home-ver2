import React, { Component } from "react";
import _ from "lodash";
import "./sideNavBar.scss";

class SideNavBar extends Component {
  
  handleClick = (title, index) => {
    this.props.scrollTo(title);
    this.navOnClick(index);
  }

  navOnClick = (index) => {
    const { data } = this.props;
    for ( let i = 0; i < data.length; i++) {
      if( index === i ) {
        if ( data[i].isActive === true) {
          data[i].isActive = true;
        }
      } else {
        data[i].isActive = false;
      }
    }
  }

  render() {
    const { data, hideNav } = this.props;
    const sideNavBar_hidden = {
      left: "-100px",
      transition: "0.5s"
    }
    const sideNavBar_appear = {
      transition: "0.5s"
    }

    return (
      <div
        className="sideNavBar_container"
        // hide nav style
        style={hideNav ? sideNavBar_hidden : sideNavBar_appear}
      >
        <div className="navBar_container">
          {_.map(data, ({ title, isActive, hover }, index) => {
            return (
              <button 
                className={isActive ? 'element_wrapper_active' : 'element_wrapper_inactive'}
                key={index} 
                onClick={() => this.handleClick(title, index)}
              >
                <div className='nav_element'>{title}</div>
                <span className="blackbar" />
              </button>
            );
          })}
        </div>
        <div className="border_bottom_line" />
      </div>
    );
  }
}

export default SideNavBar;
