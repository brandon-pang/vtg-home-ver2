import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

import "./character.scss";

const Character = ({ name, imgName, dialogue }) => {
  const [isHover, setHover] = useState(false);
  const over = () => {
    setHover(true);
  }
  const out = () => {
    setHover(false);
  }
  return (
    <div
      className={`character_wrapper-${name}`}
      onMouseOver={over}
      onMouseOut={out}
    >
      <div
        className={`ch_dialogue-${name}`}
        style={isHover ? appear : disappear}
      >
        <p className="dialogue">{ReactHtmlParser(dialogue)}</p>
      </div>

      <img className={`${name}-img`} src={imgName} alt={name} />
    </div>
  )
}

const disappear = {
  visibility: 'hidden'
}
const appear = {
  visibility: 'visible'
}

export default Character;