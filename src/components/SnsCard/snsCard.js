import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import "./snsCard.scss";
import facebookImg from "../../assets/images/acsy/ic_sns2_facebook.png";
import tweeterImg from "../../assets/images/acsy/ic_sns2_twitter.png";

const SnsCard = ({bgImg, size, date, title, desc, gameTitle, gameOriginLink, fbLink, twLink}) => {
  return (
    <a className={`sns_card_wrapper_${size}`} target="blank" href={gameOriginLink}>
      <div className="card_header">
        <div className="img_wrapper" style={{ backgroundImage: "url(" + bgImg + ")" }}></div>
        <div className="title_wrapper">
          <p className="title">{gameTitle}</p>
          <p className="date">{date}</p>
        </div>
      </div>
      <div className="card_body">
        <div className="contents" >
          <p className="contents_title">{ ReactHtmlParser(title) }</p>
          <p className="contents_desc">{ ReactHtmlParser(desc) }</p>
        </div>
      </div>
      <div className="sns_wrapper">
        { fbLink ? 
          <a target="blank" href={fbLink}>
            <img className="facebook_img" src={facebookImg} alt="facebook"/>
          </a> : null
        }
        {twLink ? 
          <a target="blank" href={twLink}>
            <img className="tweeter_img" src={tweeterImg} alt="tweeter"/>
          </a> : null
        }
      </div>
      <div className="sns_more_btn">View more</div>
    </a>
  )
}

export default SnsCard;
