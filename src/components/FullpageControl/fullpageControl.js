// The ful-page library does not work anymore

import React, { Component } from 'react';
import "./fullpageControl.scss";

class FullpageControl extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { slidesCount } = this.props;
    const getActiveSlide = this.props.getCurrentSlideIndex();
    const renderDots = (number) => {
      //console.log(number, getActiveSlide);
      let numDots = [];
      for (let i = 0; i < number; i++) {
        if (i === getActiveSlide) {
          numDots.push(<div className='nav_dot_active' key={i} onClick={() => this.props.scrollToSlide(i)}></div>)
        } else {
          numDots.push(<div className="nav_dot" key={i} onClick={() => this.props.scrollToSlide(i)}></div>)
        }
      }
      return numDots
    }
    return ( 
      <div className="controller_container">
        {renderDots(slidesCount)}
      </div>
    );
  }
}

export default FullpageControl;