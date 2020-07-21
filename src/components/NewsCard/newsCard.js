import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import "./newsCard.scss";

const NewsCard = ({size, index, bgImg, tag, publisher, date, title, desc, snsLinks, link}) => {
  //console.log(link);
  return (
    <div key={index} className={`news_cards_wrapper_${size}`}>
      { bgImg ? 
        <div 
          className="news_img_wrapper" 
          style={{ backgroundImage: "url(" + bgImg + ")" }}
        >
        </div> : null }
      <div className="news_contents_wrapper" style={noImgContentsStyle}>
        
        <div className={`news_tag_wrapper-${tag}`} style={bgImg ? null : noImgTagStyle}>{tag}</div>
        
        <div className="news--title">{ ReactHtmlParser(title) }</div>
        <div className="news_source_container">
          <div className="news_publisher">{publisher}</div>
          <div className="news_date">{date}</div>
        </div>
        <div className="news_desc">{ ReactHtmlParser(desc) }</div>
      </div>
      <a className="news_more_btn" href={link} target="blank">View more</a>
    </div>
  )
}

const noImgContentsStyle = {
  position: 'relative',
};

const noImgTagStyle = {
  position: 'relative',
  top: '0',
  margin: '0',
  marginBottom: '7px'
};

export default NewsCard;