import React from 'react';
import loading from "../../assets/images/acsy/Rolling-1s-200px.svg";

const Loading = () => {
  return (
    <div className="loading_container">
      <img src={loading} alt="Loading..."/>
    </div>
  )
}

export default Loading;