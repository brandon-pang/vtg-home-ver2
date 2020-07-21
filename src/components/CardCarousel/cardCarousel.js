import React from 'react';
import Slider from "react-slick";
import _ from "lodash";
import GameCard from "../GameCard/gameCard";
import NewsCard from "../NewsCard/newsCard";
import RightArrow from "./common/SliderArrows/rightArrowBtn";
import LeftArrow from "./common/SliderArrows/leftArrowBtn";

import "./cardCarousel.scss";

const CardCarousel = ({ gameData, newsData, mobileSize, openModal }) => {
  const gameDataCarousel = () => {
    return (
      <div className="game_card_container">
        <Slider {...settings} >
          {_.map(gameData, ({ bgImage, commingSoon, title, subtitle, btn, session }, index) => {
            return (
              <div className="slides" key={index}>
                <GameCard
                  bgImg={bgImage}
                  title={title}
                  subtitle={subtitle}
                  btn={btn}
                  session={session}
                  openModal={openModal}
                  mobileSize={mobileSize}
                  commingSoon={commingSoon}
                />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
  const newsDataCarousel = () => {
    return (
      <div className="news_card_container">
        <Slider {...settings}>
          {_.map(newsData, ({ news_image, news_tag, title, news_publisher, news_publish_date, content, news_origin_link }, index) => {
            return (
              <div className="slides" key={index}>
                <NewsCard
                  size="medium"
                  index={index}
                  bgImg={news_image}
                  tag={news_tag}
                  title={title.rendered}
                  publisher={news_publisher}
                  date={news_publish_date}
                  desc={content.rendered}
                  link={news_origin_link}
                />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
  return (
    <div className="slider_wrapper">
      {gameData ? gameDataCarousel() : null}
      {newsData ? newsDataCarousel() : null}
    </div>
  )
}

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 716,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 425,
      settings: {
        variableWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
  ]
}

export default CardCarousel;