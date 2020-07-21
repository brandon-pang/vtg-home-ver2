import React from "react";
import "./gameCard.scss";
import cancelImg from "../../assets/images/acsy/notice_ic_cancel.png"

const gameCard = ({ bgImg, notice, commingSoon, title, subtitle, btn, session, openModal }) => {
  return (
    <div className="game_card" onClick={() => openModal(session)}>
      <div className="game_card_bg" style={{ backgroundImage: "url(" + bgImg + ")" }}></div>
      {notice ?
        <div className="notice_wrapper">
          <img className="cancel_img" src={cancelImg} alt="cancel" />
          <div className="notice">{notice}</div>
        </div> : <div className="notice_wrapper_hide"></div>
      }
      {commingSoon ? <div className="coming_soon">Coming Soon</div> : null}
      <div className="game_card_contents">
        <div className="title">{title}</div>
        <div className="subtitle">{subtitle}</div> 
        {!commingSoon ?
          <button
            className="btn"
            onClick={() => openModal(session)}
          >{btn}
          </button>
          :
          null
        }
      </div>
    </div>
  );
};

export default gameCard;
