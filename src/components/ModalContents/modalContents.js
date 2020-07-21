import React, { Component } from 'react';
import _ from 'lodash';

// custom component
import ModalTitle from "../ContainerTitle/containerTitle";
import ModalGameContents from "./common/gameContents";
import ModalLinkButton from "./common/modalButton";
import KWHcontents from "../KwonhoContents/kwonhoContents";
import ScrollView, { ScrollElement } from "../ScrollView/scroller";
import NavToTop from "../NavToTop/navToTop";

// style
import "./modalContents.scss";

//image
import vertigoLogo from "../../assets/images/acsy/vertigogames_b.png";
import closeIcon from "../../assets/images/acsy/ic_cancel_b.png";
import closeIcon_w from "../../assets/images/acsy/ic_cancel_w.png";
import googleStore from "../../assets/images/acsy/google_play.png";
import appleStore from "../../assets/images/acsy/app_store.png"
//import gameHeaderImg from "../../assets/images/modal_games/popup_bs.png";

class ModalContents extends Component {
  // scroll to section
  scrollTo = (title) => {
    this._scroller.scrollTo(title, 500);
  }
  render() {
    const {
      extra,
      imgUrl,
      title,
      genre,
      features,
      developer,
      publisher,
      releaseDate,
      desc,
      gameBtn,
      mobileSize,
      json,
      gameStore
    } = this.props;
    return (
      <ScrollView ref={scroller => this._scroller = scroller}>
      <div className="modal_container">
          <ScrollElement title='modalTop'><div/></ScrollElement>
        <div className="modal_header_wrapper">
          {mobileSize ? null : <img className="logo" src={vertigoLogo} alt="Vertigo Logo" />}
          <button className="closed--btn" onClick={this.props.closeModal}>
            {mobileSize ? <img src={closeIcon_w} alt="close" /> : <img src={closeIcon} alt="close" />}
          </button>
        </div>
        <div className="modal_header_img_wrapper">
          {mobileSize ? 
            <div className="game_header_mobile--img" style={{ backgroundImage: "url(" + imgUrl + ")" }}></div> 
            : 
            <img className="game_header--img" src={imgUrl} alt="game header img" />
          }
        </div>
        <div className="modal_game_title_wrapper">
          <ModalTitle
            color="orange"
            title={title}
          />
        </div>
        <ModalGameContents
          genre={genre}
          features={features}
          releaseDate={releaseDate}
          developer={developer}
          publisher={publisher}
        />

        <div className="modal_div_line"></div>
        <div className="modal_game--desc">
          {desc}
        </div>
        {extra ? <KWHcontents mobileSize={mobileSize} json={json}/> : null}
        
        {gameStore ? 
          <div className="store_wrapper">
            {_.map(gameStore, ({url, store}, index) => {
              return (
                <a href={url} target="_blank" key={index}>
                  {store === 'google' ? <img src={googleStore} alt="google play" /> : <img src={appleStore} alt="apple store" />}
                </a>  
              )
            })}
          </div>
          :
          null
        }
        
        {extra ? 
          null
          :
          <div className="modal_game_btn_wrapper">
            {_.map(gameBtn, ({ title, url }, index) => {
              return (
                <ModalLinkButton
                  title={title}
                  url={url}
                  key={index}
                />
              )
            })}
          </div>
        }
        
        { extra ? 
          <div className="last_section_nav" style={{ marginTop: '50px'}}>
            <NavToTop scrollTo={this.scrollTo} top='modalTop' />
          </div>
          :
          null
        }
      </div>
      </ScrollView>
    )
  }
}

export default ModalContents;