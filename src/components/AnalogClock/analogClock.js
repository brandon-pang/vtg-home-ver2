import React from 'react';
import "./analogClock.scss";

const AnalogClock = ({ city, hours, minutes, seconds }) => {
  //console.log(city, hours, minutes, seconds);
  const hoursDegrees = hours * 30 + minutes / 2;
  const minutesDegrees = minutes * 6 + seconds / 10;
  const secondsDegrees = seconds * 6;
  const hourlyStyle = {
    transform: "rotateZ(" + hoursDegrees + "deg)"
  }
  const minStyle = {
    transform: "rotateZ(" + minutesDegrees + "deg)"
  }
  const secStyle = {
    transform: "rotateZ(" + secondsDegrees + "deg)"
  }
  return (
    <div className="city_clock_wrapper">
      <div className="analog_clock_wrapper">
        <div id="clock" className="clock_content">
          <div className="clock_indicator"></div>
          <div
            id="hours-indicator"
            className={"indicator hours-indicator " + (hours === 0 ? "" : "transition-effect")}
            style={hourlyStyle}
          >
          </div>
          <div
            id="minutes-indicator"
            className={"indicator minutes-indicator " + (minutes === 0 ? "" : "transition-effect")}
            style={minStyle}
          >
          </div>
          <div
            id="seconds-indicator"
            className={"indicator seconds-indicator " + (seconds === 0 ? "" : "transition-effect")}
            style={secStyle}
          >
          </div>
        </div>
      </div>
      <div className="city_name_wrapper">
        {city}
      </div>
    </div>
  )
}

export default AnalogClock;