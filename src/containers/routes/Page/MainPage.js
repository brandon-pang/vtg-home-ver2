import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import _ from 'lodash';
import axios from 'axios';
import Modal from 'react-modal';

import { useModal } from '../../../contexts/modal';

// custom components
import PapayaBtn from "../../../components/PapayaBtn/papayaBtn";
import MastHeadMotion from "../../../components/MastHeadMotion/masterHeadMotion";
import MainTitle from "../../../components/MainSectionTitle/mainTitles"; 
import ScrollView, { ScrollElement } from "../../../components/ScrollView/scroller";
import CardCarousel from "../../../components/CardCarousel/cardCarousel";
import ModalContainer from '../../../components/ModalContainer/modalContainer';
import NavDownArrow from '../../../components/NavDownArrow/navDownArrow';
import NavToTop from "../../../components/NavToTop/navToTop";

// images
import mainImage from "../../../assets/images/bg/bg_main_home.png";
import vertigoSymbol from "../../../assets/images/bg/simbol_big.png";
import bsCardBG from "../../../assets/images/gameCards/home_thumb_bs.png";
import uwoCardBG from "../../../assets/images/gameCards/home_thumb_UWO.png";
import wrCardBG from "../../../assets/images/gameCards/home_thumb_WR_.png";
import wozCardBG from "../../../assets/images/gameCards/home_thumb_WOZ_.png";
import dkrBG from "../../../assets/images/gameCards/home_thumb_dkr_.png";
import bsmBG1 from "../../../assets/images/gameCards/home_thumb_BSM_.png";
import bsmBG2 from "../../../assets/images/gameCards/home_thumb_BSM2_.png";
import ltBG from "../../../assets/images/gameCards/home_thumb_LT_.png";
import khBG from "../../../assets/images/gameCards/home_thumb_KH_.png";
import pubBSCardBG from "../../../assets/images/gameCards/home_thumb_bsr.png";

import "./pageStyle/mainPage.scss";

Modal.setAppElement('#root')

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRoute: 'http://cms.vertigogames.com/cms/wp-json/wp/v2/posts',
      newsInitialArr: [],
      mobileSize: false,
      loadNews: false,
      headerOpacity: 1,
      bgScale: 1
    }
  }
  
  componentDidMount() {
    const {json} = this.props
    this.fetchWPPost();
    // assign json to const array
    for (let i = 0; i < DEVELOPED_GAMES.length; i++) {
      if (json === '') {
        return ''
      } else {
        DEVELOPED_GAMES[i].title = json.main_section_develop_games[i].title;
        DEVELOPED_GAMES[i].subtitle = json.main_section_develop_games[i].subtitle;
        DEVELOPED_GAMES[i].btn = json.main_section_develop_games[i].btn;
      }
    }

    for (let i = 0; i < PUBLISHED_GAMES.length; i++) {
      if (json === '') {
        return ''
      } else {
        PUBLISHED_GAMES[i].title = json.main_section_publish_games[i].title;
        PUBLISHED_GAMES[i].subtitle = json.main_section_publish_games[i].subtitle;
        PUBLISHED_GAMES[i].btn = json.main_section_publish_games[i].btn;
      }
    }
  }

  componentWillUnmount() {
    this.signal.cancel('news api is being canceled');
  }

  signal = axios.CancelToken.source();
  // fetch WP post
  fetchWPPost = async () => {
    try {
      this.setState({ loadNews: true})
      await axios.get(this.state.dataRoute, {
        params: { per_page: 100 }, cancelToken: this.signal.token
      })
        .then(res => {
          //console.log(res);
          // categorize 10 = news
          // sort array use filter
          const sortNewsData = _.filter(res.data, ['categories', [2]]);
          //console.log(sortNewsData);  
          this.setState({ newsInitialArr: sortNewsData })
        })
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled
      } else {
        this.setState({ loadNews: false })
      }
    }
  }

  // when modal is open, change full page mode to normal scroll mode
  // openModal = (session) => {
  //   // if (session === 0) {
  //   //   this.setState({ isModalOpen: false})
  //   // } else {
  //   //   this.setState({ isModalOpen: true, session: session })
  //   // }
  //   this.setState({ isModalOpen: true, session: session })
  // }

  closingModal = () => {
    const { mobileSize, tabletSize, closeModal } = this.props;
    if (mobileSize || tabletSize) {
      closeModal();
    } else {
      closeModal();
    }
  }

  handleMotionClick = () => {
    this.setState({ headerOpacity: 0, bgScale: 1.5 })
  }

  scrollTo = (title) => {
    this._scroller.scrollTo(title, 900);
    this.handleMotionClick();
  }

  endMotion = () => {
    this.raf = requestAnimationFrame(() => this.setState({ headerOpacity: 1, bgScale: 1 }))
  }

  render() {
    const { newsInitialArr, headerOpacity, bgScale } = this.state;
    const { mobileSize, json, history, openModal, session, closeModal, isModal } = this.props;
    const imgUrl = mainImage;
    const title = json.main_section_1_title;
    const subtitle = json.main_section_1_subtitle;
    //const desc = json.main_section_1_desc;

   
    
    return (
      <ScrollView ref={scroller => this._scroller = scroller}>
        <div className="main_page_container">
          <div className="main_slide1">
          <ScrollElement title={'top'}>
            <div />
          </ScrollElement>
          <MastHeadMotion
            bgImage={imgUrl}
            title={title}
            subtitle={subtitle}
            scrollTo={this.scrollTo}
            below={'main_slide2'}
            opacity={headerOpacity}
            scale={bgScale}
            endMotion={this.endMotion}
          />
        </div>
          

        
        <div className="main_slide2">
          <ScrollElement title="main_slide2">
            <div className="subHead_container">
              <div className="subHead_contents">
                <img className="vSymbol" src={vertigoSymbol} alt="vsymbol" />
                {
                  mobileSize ? <div className="subHead_title">
                    {/* 롤러코스터를 탈 때 기분이 아찔해지는 경험을 한 적이 있나요? */}
                    { ReactHtmlParser(json.main_section_2_title_mobile) }
                  </div> :
                    <div className="subHead_title">
                      {/* 롤러코스터를 탈 때<br /> 기분이 아찔해지는<br /> 경험을 한 적이 있나요? */}
                      { ReactHtmlParser(json.main_section_2_title) }
                    </div>
                }
                {
                  mobileSize ? <div className="subHead_desc">
                    {/* 그때 느낀 경험이 바로 VERTIGO 입니다<br /> 우리는 그 경험을 게임에
                    가져오는 것을 목표로 합니다 */}
                    { ReactHtmlParser(json.main_section_2_desc_mobile) }
                  </div> :
                    <div className="subHead_desc">
                    {
                      /* 그때 느낀 경험이 바로 VERTIGO 입니다
                      <br /> 우리는 그 경험을 게임에 가져오는 것을 목표로 합니다
                      <br /> 버티고우 게임즈는 한국에 본사를 둔 게임회사로
                      <br /> 캐나다, 싱가포르 지사와 함께 글로벌 시장을 타겟하는 게임을 개발하며 서비스하는
                      <br />
                      회사입니다. */
                    }
                    { ReactHtmlParser(json.main_section_2_desc) }
                    </div>
                }
                <div className="subHead_stats">
                  <div className="stats_countries-wrapper">
                    <div className="stats_countries-title">{json.main_section_2_country_title}</div>
                    <div className="stats_countries-desc">{json.main_section_2_country_desc}</div>
                  </div>
                  <div className="stats_players-wrapper">
                    <div className="stats_players-title">{json.main_section_2_player_title}</div>
                    <div className="stats_players-desc">{json.main_section_2_player_desc}</div>
                  </div>
                  <div className="stats_offices-wrapper">
                    <div className="stats_offices-title">{json.main_section_2_office_title}</div>
                    <div className="stats_offices-desc">{json.main_section_2_office_desc}</div>
                  </div>
                </div>
              </div>
              <NavDownArrow scrollTo={this.scrollTo} below={'main_body_container'} />
            </div>
          </ScrollElement>
        </div>
        <ScrollElement title="main_body_container">
          <div className="main_body_container">
            <div className="main_slide3">
              <div className="games_container">
                <div className="games_title">
                  {/* 우리는 <b>게임 개발사</b> 입니다 */}
                  {ReactHtmlParser(json.main_section_games_title)}
                </div>
                <MainTitle
                  title={json.main_section_games_main_title}
                  desc={json.main_section_games_main_desc}
                  name={json.main_section_games_main_title}
                />
                <div className="develop_game_card_container">
                  <CardCarousel
                    gameData={DEVELOPED_GAMES}
                    openModal={openModal}
                    mobileSize={mobileSize}
                  />
                </div>
                {/* <button className="toNextSlide" onClick={() => this.fp.scrollToSlide(3)}>
                  <img src={downArrow_black} alt="down arrow" />
                </button> */}
              </div>
            </div>

            <div className="main_slide4">
              <div className="publishing_container">
                <div className="publishing_title">
                  {/* 우리는 <span className="green_font">PapayaPlay</span>를 통해 게임을 서비스 합니다 */}
                  { ReactHtmlParser(json.main_section_publish_title) }
                </div>
                <MainTitle
                  title={json.main_section_publish_main_title}
                  desc={json.main_section_publish_main_desc}
                  name={json.main_section_publish_main_title} />
                <div className="publish_game_card_container" style={{ width: "100%" }}>
                  <CardCarousel
                    gameData={PUBLISHED_GAMES}
                    openModal={openModal}
                    mobileSize={mobileSize}
                  />
                </div>
                <div className="papaya_btn_wrapper">
                  <PapayaBtn json={json.papaya_play_button} />
                </div>
                {/* <button className="toNextSlide" onClick={() => this.fp.scrollToSlide(4)}>
                  <img src={downArrow_black} alt="down arrow" />
                </button> */}
              </div>
            </div>

            <div className="main_slide5">
              <div className="news_container">
                  <div className="news_title">{ ReactHtmlParser(json.main_section_news_title) }</div>
                <MainTitle
                  title={json.main_section_news_main_title}
                  desc={json.main_section_news_main_desc}
                  name={json.main_section_news_main_title}
                />
                <CardCarousel newsData={newsInitialArr} />
              </div>
            </div>
          </div>
        </ScrollElement>


          {/* modal */}
          <ModalContainer
            localeJson={json}
            isModalOpen={isModal}
            session={session}
            closeModal={closeModal}
            mobileSize={mobileSize}
            history={history}
          />

          <div className="toTopSlide_wrapper">
            <NavToTop scrollTo={this.scrollTo} top={'top'} />
          </div>
        {/* </FullPage> */}
        </div>
      </ScrollView>
    )
  }
}

/* Developed games, Published games []
    session: modal container data index in "modalContainer component"
    comingsoon: true / false
    notice: 서비스 종료
    title: game title
    subtitle: game subtitle
    btn: button to activate modal
*/

const DEVELOPED_GAMES = [
  {
    session: 0,
    commingSoon: false,
    notice: "",
    bgImage: bsmBG1,
    title: "Blackshot M",
    subtitle: "MOBILE FPS",
    btn: "view more"
  },
  {
    session: 1,
    commingSoon: false,
    bgImage: bsCardBG,
    notice: "",
    title: "블랙샷",
    subtitle: "밀리터리 F2P MMORPG",
    btn: "view more"
  },
  {
    session: 6,
    commingSoon: false,
    bgImage: wozCardBG,
    notice: "서비스 종료",
    title: "War Of Zombie",
    subtitle: "밀리터리 F2P MMORPG",
    btn: "view more"
  },
  {
    session: 7,
    commingSoon: false,
    bgImage: khBG,
    notice: "서비스 종료",
    title: "권호",
    subtitle: "온라인 결투 액션게임",
    btn: "view more"
  }
];
const PUBLISHED_GAMES = [
  {
    session: 1,
    commingSoon: false,
    bgImage: pubBSCardBG,
    title: '블랙샷',
    subtitle: '밀리터리 F2P MMORPG',
    btn: 'view more'
  },
  {
    session: 5,
    commingSoon: false,
    bgImage: uwoCardBG,
    title: '대항해 시대 온라인',
    subtitle: '바다위에서 펼쳐지는 MMORPG',
    btn: 'view more'
  },
  {
    session: 2,
    commingSoon: false,
    bgImage: dkrBG,
    title: '데카론',
    subtitle: '판타지 액션 MMORPG',
    btn: 'view more'
  },
  {
    session: 4,
    commingSoon: false,
    bgImage: ltBG,
    title: '라테일',
    subtitle: '판타지 액션 MMORPG',
    btn: 'view more'
  },
  {
    session: 3,
    commingSoon: false,
    bgImage: wrCardBG,
    title: '워록',
    subtitle: '멀티플레이어 FPS',
    btn: 'view more'
  }
]

export default useModal(({ state, actions }) => ({
  isModal: state.isModal,
  session: state.session,
  openModal: actions.openModal,
  closeModal: actions.closeModal
}))(MainPage);
//export default MainPage;
