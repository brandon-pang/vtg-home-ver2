import React, { Component } from "react";
import _ from "lodash";
import Modal from 'react-modal';

import { useModal } from '../../../contexts/modal';
import MastHead from "../../../components/MastHead/mastHead";
import GameCardSmall from "../../../components/GameCardSmall/gameCardSmall";
import ModalContainer from '../../../components/ModalContainer/modalContainer'
import ScrollView, { ScrollElement } from "../../../components/ScrollView/scroller";
import NavToTop from "../../../components/NavToTop/navToTop";

import gameImage from "../../../assets/images/bg/bg_main_games.png";
// game tile
import BSM_thumb_img from "../../../assets/images/games_thumb/thumb_bs4.png";
import BS_thumb_img from "../../../assets/images/games_thumb/thumb_2_bs2.png";
import DK_thumb_img from "../../../assets/images/games_thumb/thumb_2_dkr.png";
import LT_thumb_img from "../../../assets/images/games_thumb/thumb_2_lt.png";
import WOZ_thumb_img from "../../../assets/images/games_thumb/thumb_2_woz.png";
import KWHO_thumb_img from "../../../assets/images/games_thumb/thumb_2_kwho.png";
import UWO_thumb_img from "../../../assets/images/games_thumb/thumb_2_uwo.png";
import WR_thumb_img from "../../../assets/images/games_thumb/thumb_2_wr.png";


import "./pageStyle/gamePage.scss";

Modal.setAppElement('#root')
class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: ''
    }
    this.scrollTo = this.scrollTo.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // scroll to section
  scrollTo = (title) => {
    this._scroller.scrollTo(title, 500);
  }

  render() {
    const { mobileSize, json, history, isModal, session, openModal, closeModal } = this.props;

    for (let i = 0; i < PAPAYA_GAMES.length; i++) {
      if (json === '') {
        return ''
      } else {
        PAPAYA_GAMES[i].title = json.papaya_game_data[i].title;
        PAPAYA_GAMES[i].subtitle = json.papaya_game_data[i].subtitle;
      }
    }
    
    const imgUrl = gameImage;
    const title = json.games_section_top_title;
    const subtitle = json.games_section_top_subtitle;

    return (
      <ScrollView ref={scroller => this._scroller = scroller}>
        <div className="game_container">
          <ScrollElement title={'top'}>
            <div className="dim_layer" />
          </ScrollElement>
          <MastHead
            bgImage={imgUrl}
            title={title}
            subtitle={subtitle}
            scrollTo={this.scrollTo}
            below={'gamepage'}
          />
          <ScrollElement title="gamepage">
            <div className="gamepage_top"></div>
          </ScrollElement>
          <div className="papaya_games_container">
            <div className="gameCard_container">
              {_.map(PAPAYA_GAMES, ({ active, imgName, title, subtitle, env, n, commingSoon }, index) => {
                return (
                  <GameCardSmall
                    openModal={openModal}
                    active={active}
                    imgName={imgName}
                    title={title}
                    subtitle={subtitle}
                    env={env}
                    n={n}
                    key={index}
                    index={index}
                    commingSoon={commingSoon}
                  />
                )
              })}
            </div>
          </div>

          {/* modal */}
          <ModalContainer
            localeJson={json}
            isModalOpen={isModal} 
            session={session}
            closeModal={closeModal}
            mobileSize={mobileSize}
            history={history}
          />

          <div className="last_section_nav">
            <NavToTop scrollTo={this.scrollTo} top={'top'} />
          </div>
        </div>
      </ScrollView>
    );
  }
}

/*
  imgName: image of the game,
  title: title of the game,
  subtitle: genre of the game,
  env: environment support
  n: the new game badge
*/
const PAPAYA_GAMES = [
  {
    link: '/bsMobile',
    active: true,
    imgName: BSM_thumb_img,
    title: "Blackshot 모바일",
    subtitle: "Mobile FPS",
    env: ["Android", "iOS"],
    n: true,
    commingSoon: false
  },
  {
    link: '/bs',
    active: true,
    imgName: BS_thumb_img,
    title: "BlackShot",
    subtitle: "밀리터리 F2P MMOFPS",
    env: ["Windows"],
    n: true,
    commingSoon: false
  },
  {
    link: '/dk',
    active: true,
    imgName: DK_thumb_img,
    title: "데카론",
    subtitle: "판타지 액션 MMORPG",
    env: ["Windows"],
    n: false,
    commingSoon: false
  },
  {
    link: '/wr',
    active: true,
    imgName: WR_thumb_img,
    title: "워록",
    subtitle: "멀티플레이어 FPS",
    env: ["Windows"],
    n: false,
    commingSoon: false
  },
  {
    link: '/lt',
    active: true,
    imgName: LT_thumb_img,
    title: "라 테일",
    subtitle: "판타지 액션 MMORPG",
    env: ["Windows"],
    n: false,
    commingSoon: false
  },
  {
    link: '/uwo',
    active: true,
    imgName: UWO_thumb_img,
    title: "대항해 시대 온라인",
    subtitle: "바다위에서 펼쳐지는 MMORPG",
    env: ["Windows"],
    n: false,
    commingSoon: false
  },
  {
    link: '/woz',
    active: true,
    imgName: WOZ_thumb_img,
    title: "워 오브 좀비",
    subtitle: "밀리터리 F2P MMORPG",
    env: ["Windows"],
    n: false,
    commingSoon: false
  },
  {
    link: '/kwho',
    active: true,
    imgName: KWHO_thumb_img,
    title: "권호",
    subtitle: "온라인 결투 액션게임",
    env: ["Windows"],
    n: false,
    commingSoon: false
  }
];

export default useModal(({ state, actions }) => ({
  isModal: state.isModal,
  session: state.session,
  openModal: actions.openModal,
  closeModal: actions.closeModal
}))(GamePage);