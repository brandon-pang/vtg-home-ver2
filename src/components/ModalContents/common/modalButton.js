import React from 'react';
import btnArrow from "../../../assets/images/acsy/ic_arrow_small_next.png";

const ModalLinkButton = ({ title, url }) => {
  return(
    <div>
    {
      title ? 
      <a className="modal_game_link--btn" href={url} target="_blank">
        <p className="gameWeb--title">{title}</p>
        <img className="btn_arrow" src={btnArrow} alt="goToArrow" />
      </a> : null
    }
    </div>
  )
}

export default ModalLinkButton;