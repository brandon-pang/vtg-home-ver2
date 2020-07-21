import React from 'react';
import _ from "lodash";
import ReactHtmlParser from 'react-html-parser';
import PrintStarts from "./stars";

import "./kwhStyle.scss";

const KwhStyle = ({position, difficulties, styleImg, title, stars, desc}) => {
  return (
    <div className="kwhStyle_wrapper">
      <div className={`img_wrapper-${position}`}>
        {_.map(styleImg, (img, index) => {
          return (
            <img
              className={`character-${index}`}
              src={img}
              key={index}
              alt="character"
            />
          )
        })}        
      </div>
      <div className={`kwhStyle_desc_wrapper ${position}`}>
        <p className="kwhStyle_title">{title}</p>
        <div className="difficulties_wrapper">
          <p className="difficulties_title">난이도</p>
          <PrintStarts number={difficulties}/>
        </div>
        <p className="kwhStyle_desc">{ ReactHtmlParser(desc) }</p>
      </div>
    </div>
  )
}

export default KwhStyle;