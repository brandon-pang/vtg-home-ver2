import React from 'react';
import _ from "lodash";
import ReactHtmlParser from 'react-html-parser';
import "./gameCardSmall.scss";
import newBadgeImg from "../../assets/images/acsy/gamethumb_new.png";

const GameCardSmall = ({ active, imgName, title, subtitle, env, n, index, commingSoon, openModal }) => {
  return (
    <div className="game_card_small" key={index}>
      <div
        className="game_card_new"
        // ternary expression for [N] badge
        style={n ? { display: 'block' } : { display: 'none' }}
      >
        <img src={newBadgeImg} alt="New" />
      </div>
      <div className="game_card_bg_parent" onClick={() => openModal(index)}>
        {commingSoon ?
          <div className="commingSoon_overlap">
            <p className="commingSoon_p">coming soon</p>
          </div> : null
        }
        <div className="game_card_bg_child" style={{ backgroundImage: "url(" + imgName + ")" }}></div>
      </div>
      <div className="game_title">{ReactHtmlParser(title)}</div>
      <div className="game_subtitle">{subtitle}</div>
      <div className="game_env_container">
        {_.map(env, (item, index) => {
          return <div className="game_environment" key={index}>{item}</div>;
        })}
      </div>
      {
        active ?
          <button onClick={() => openModal(index)} className="game_view_more_btn">View More</button>
          :
          <div className="game_view_more_btn_inactive"></div>
      }
    </div>
  )
}

export default GameCardSmall;
