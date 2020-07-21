import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import "./toolTip.scss";

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      displayTooltip: false
    }
  }

  hideTooltip = () => {
    this.setState({ displayTooltip: false });
  }
  showTooltip = () => {
    this.setState({ displayTooltip: true });
  }

  render() {
    //console.log(this.props);
    const { displayTooltip } = this.state;
    const { 
      name,
      imgName, 
      location, 
      address, 
      contact, 
      phoneNumber, 
      mapLink 
    } = this.props;

    return (
      <div className={`tooltip-${name}`} onMouseLeave={this.hideTooltip}>
        {
          displayTooltip &&
          <div className={`tooltip_container-${name}`}>
            <div className="location">{location}</div>
            <div className="address">{ ReactHtmlParser(address) }</div>
            <a className="contact" href={contact} target="blank">{contact}</a>
            <div className="phone_num">{phoneNumber}</div>
            <a className="viewMore_btn" href={mapLink} target="blank">
              View More
            </a>
          </div>
        } 
        
        <div className="tooltip_indicator" onMouseOver={this.showTooltip}>
          <img src={imgName} alt="indicator" />
        </div>
      </div>
     );
  }
}
 
export default Tooltip;