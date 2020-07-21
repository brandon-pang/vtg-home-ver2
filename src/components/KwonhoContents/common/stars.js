import React, { Component } from 'react';
import star from "../../../assets/images/acsy/star.png";

class Stars extends Component {
  renderStarts = (number) => {
    let numStars=[];
    for(let i = 1; i <= number; i++) {
      numStars.push(<img src={star} key={i} alt="star"/>);
    }
    return numStars;
  }
  render() {
    const { number } = this.props;
    return ( 
      <div>{this.renderStarts(number)}</div>
    );
  }
}

export default Stars;