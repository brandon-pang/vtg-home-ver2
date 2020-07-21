import React, { Component } from "react";
import ReactHtmlParser from 'react-html-parser';
import _ from "lodash";
import { Motion, spring } from "react-motion";


// import custom components
import MastHead from "../../../components/MastHead/mastHead";
import ContainerTitle from "../../../components/ContainerTitle/containerTitle";
import AboutBox from "../../../components/AboutBox/aboutBox"; 
import PapayaBtn from "../../../components/PapayaBtn/papayaBtn";
import HistoryBody from "../../../components/HistoryBody/historyBody";
import SideNavBar from "../../../components/SideNavBar/sideNavBar";
import ScrollView, { ScrollElement } from "../../../components/ScrollView/scroller";
import NavToTop from "../../../components/NavToTop/navToTop";
import Delay from "../../../components/DelayAnimation/delayAnimation";
import Character from "../../../components/Character/character";
import WhenInView from "../../../components/WhenInView/whenInView";

// images
import mainImage from "../../../assets/images/bg/bg_main_about2.png";
import globalImg from "../../../assets/images/aboutSix/global.png";
import teamImg from "../../../assets/images/aboutSix/team.png";
import paymentImg from "../../../assets/images/aboutSix/payment.png";
import locationImg from "../../../assets/images/aboutSix/location.png";
import communityImg from "../../../assets/images/aboutSix/community.png";
import solutionImg from "../../../assets/images/aboutSix/solution.png";
import char1 from "../../../assets/images/historyCharImg/history_img_1.png"
import char2 from "../../../assets/images/historyCharImg/history_img_2.png"
import char3 from "../../../assets/images/historyCharImg/history_img_3.png"
import char4 from "../../../assets/images/historyCharImg/history_img_4.png"
import char5 from "../../../assets/images/historyCharImg/history_img_5.png"

// style
import "./pageStyle/aboutPage.scss";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideNav: false,
      topLine: null
    }
    this.listenScrollNavEvent = this.listenScrollNavEvent.bind(this);
    this.scrollNavMenu = this.scrollNavMenu.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    //this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    
    window.scrollTo(0, 0);
    // hide nav bar when launched initially
    this.setState({ hideNav: true });
    window.addEventListener("scroll", this.listenScrollNavEvent);
    window.addEventListener("scroll", this.scrollNavMenu);
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScrollNavEvent);
    window.removeEventListener("scroll", this.scrollNavMenu);
    window.removeEventListener("resize", this.handleResize);
    clearTimeout(this.hideNavTimer);
  }

  componentDidUpdate(prevProps) {
    const { mobileSize } = this.props;
    if (prevProps.mobileSize !== mobileSize) {
      this.setState({ topLine: -299 })
    }
  }

  // side navbar event function
  listenScrollNavEvent = () => {
    const { topLine } = this.state;
    const { mobileSize } = this.props;
    const sideNavBar = this.sn.getBoundingClientRect();
    const lastSection = this.lastSection.offsetTop;
    clearTimeout(this.hideNavTimer);
    this.hideNavTimer = setTimeout(() => {
      this.setState({ hideNav: true });
    }, 2000);
    if (mobileSize) {
      this.setState({ topLine: -249 })
    } else {
      this.setState({ topLine: -548 })
    }
    if (sideNavBar.top >= topLine) {
      this.setState({ hideNav: true });
    } else {
      this.setState({ hideNav: false });
    }
    // when it reaches footer hide the nav
    if(window.pageYOffset + 560 > lastSection) {
      this.setState({ hideNav: true });
    }
  }

  scrollNavMenu = () => {
    const sideNavBar = this.sn.getBoundingClientRect().top * 0;
    const vgContainer = this.vgContainer.getBoundingClientRect().top - 100;
    const pypContainer = this.pypContainer.getBoundingClientRect().top - 100;
    const hisContainer = this.hisContainer.getBoundingClientRect().top - 100;

    if (sideNavBar >= vgContainer && sideNavBar <= pypContainer) {
      //console.log('section1');
      SIDE_NAV_DATA[0].isActive = false;
      SIDE_NAV_DATA[1].isActive = false;
      SIDE_NAV_DATA[2].isActive = true;
    }
    if (sideNavBar >= pypContainer && sideNavBar <= hisContainer) {
      //console.log('section2');
      SIDE_NAV_DATA[1].isActive = true;
      SIDE_NAV_DATA[0].isActive = false;
      SIDE_NAV_DATA[2].isActive = false;
    }
    if (sideNavBar >= hisContainer) {
      //console.log('section3');
      SIDE_NAV_DATA[2].isActive = false;
      SIDE_NAV_DATA[1].isActive = false;
      SIDE_NAV_DATA[0].isActive = true;
    }
  }

  scrollTo = (title) => {
    this._scroller.scrollTo(title);
  }

  render() {
    const { hideNav } = this.state;
    const { mobileSize, tabletSize, json } = this.props;
    //console.log(this.sideNavBar);
    const imgUrl = mainImage;
    const title = json.about_section_top_title;
    const subtitle = json.about_section_tpp_subtitle;
    //const desc = json.about_section_top_desc;

    // assign json to const array
    for (let i = 0; i < SIX_REASON.length; i++) {
      if (json === '') {
        return ''
      } else {
        SIX_REASON[i].title = json.six_reason_data[i].title;
      }
    }

    for (let i = 0; i < HISTORY_DATA_MOBILE.length; i++) {
      if (json === '') {
        return ''
      } else {
        HISTORY_DATA_MOBILE[i].year = json.history_data[i].year;
        HISTORY_DATA_MOBILE[i].contents = json.history_data[i].contents;
      }
    }
    return (
      <ScrollView ref={scroller => this._scroller = scroller} topOffsett={mobileSize ? 50 : 80}>
        <div className="about_container">
          <ScrollElement title={'top'}>
            <div />
          </ScrollElement>
          <div className="sideNavBar_wrapper" ref={sn => { this.sn = sn }} >
            <SideNavBar
              data={SIDE_NAV_DATA}
              scrollTo={this.scrollTo}
              hideNav={hideNav}
            />
          </div>
          <div className="dim_layer" />
          <div className="master_head_wrapper" ref={mh => { this.mhContainer = mh }}>
            <MastHead
              bgImage={imgUrl}
              title={title}
              subtitle={subtitle}
              scrollTo={this.scrollTo}
              below={'aboutpage'}
            />
          </div>


          <div ref={vg => { this.vgContainer = vg }}></div>
          <ScrollElement title="aboutpage">
            <div className="aboutpage_top"></div>
          </ScrollElement>
          <ScrollElement title={SIDE_NAV_DATA[2].title}>
            {/* section 1 */}
            <div className="subHead_container">
              <div className="subHead_contents">
                <ContainerTitle
                  title={json.about_section_1_title}
                  color={"orange"}
                />
                <div className="about_desc">{ ReactHtmlParser(json.about_section_1_desc) }</div>
              </div>
            </div>

          </ScrollElement>

          {/* section 2 */}
          <div ref={vg => { this.pypContainer = vg }}></div>
          <ScrollElement title={SIDE_NAV_DATA[1].title}>
            <div className="papayaPlay_six_container" id="section2">
              <div className="six_contents" >
                <ContainerTitle
                  title={json.about_section_2_title}
                  color={"green"}
                />
                <div className="six_desc">{ ReactHtmlParser(json.about_section_2_desc) }</div>
                <div className="six_box_wrapper">
                  {_.map(SIX_REASON, ({ title, imgName }, index) => {
                    return <AboutBox title={title} imgName={imgName} key={index} />;
                  })}
                </div>
              </div>
              <PapayaBtn />
            </div>
          </ScrollElement>

          {/* section 3 : history */}
          <div ref={vg => { this.hisContainer = vg }}></div>
          <ScrollElement title={SIDE_NAV_DATA[0].title}>
            <div className="vertigo_history_container" id="section3">
              <div className="history_inner_wrapper">
                <div className="title_wrapper">
                  <ContainerTitle
                    title={json.about_section_3_title}
                    color={"orange"}
                  />
                </div>
                <div className="history_line_vertical" />
                {tabletSize || mobileSize ?
                  null
                  :
                  // <div></div>
                  <WhenInView>
                    {({ isInView }) =>
                      <div className="character_container">
                        {_.map(CHARATER_DATA, ({ name, imgName, dialogue }, index) => {
                          return (
                            <Delay hide={isInView} key={index} initial={0} value={1} period={index * 800}>
                              {delayed =>
                                <Motion
                                  defaultStyle={{ opacity: 0 }}
                                  style={{ opacity: spring(delayed) }}
                                >
                                  {value =>
                                    <div style={{ opacity: value.opacity }}>
                                      <Character
                                        name={name}
                                        imgName={imgName}
                                        dialogue={dialogue}
                                      />
                                    </div>
                                  }
                                </Motion>
                              }
                            </Delay>
                          )
                        })}
                      </div>
                    }
                  </WhenInView>
                }
                <HistoryBody historyData={HISTORY_DATA_MOBILE} tabletSize={tabletSize} mobileSize={mobileSize} />

              </div>
            </div>
          </ScrollElement>

          {/* last section: scroll to Top */}
          <div className="last_section_nav" ref={vg => { this.lastSection = vg }}>
            <NavToTop scrollTo={this.scrollTo} top={'top'} />
          </div>
        </div>
      </ScrollView>
      
    );
  }
}

const HISTORY_DATA_MOBILE = [
  {
    year: "2018",
    contents: [
      {
        month: "1월",
        topic: [<b>싱가포르</b>, "지사 설립"]
      }
    ]
  },
  {
    year: "2017",
    contents: [
      {
        month: "12월.",
        topic: [<b>Blackshot SEA</b>, " 자체 퍼블리싱 시작",]
      },
      {
        month: "10월.",
        topic: "WarRock(워록), La Tale(라테일), Uncharted Water Online(대항해 시대 온라인) 퍼블리싱",
      },
    ]
  },
  {
    year: "2016",
    contents: [
      {
        month: "5월.",
        topic: "Dekaron(데카론) 서비스 시작"
      },
      {
        month: "",
        topic: ["글로벌 게임 플랫폼 ", <b>Papaya Play</b>, " 출시"]
      },
    ]
  },
  {
    year: "2015",
    contents: [
      {
        month: "7월.",
        topic: [<b>밴쿠버</b>, " 지사 설립"]
      },
    ]
  },
  {
    year: "2014",
    contents: [
      {
        month: "3월.",
        topic: [<b>북미</b>, " 지사 설립"]
      },
    ]
  },
  {
    year: "2013",
    contents: [
      {
        month: "7월.",
        topic: [<b>Blackshot Global</b>, " 자체 퍼블리싱 시작"]
      },
    ]
  },
  {
    year: "2010",
    contents: [
      {
        month: "7월.",
        topic: [<b>Blackshot Global</b>, " 서비스 시작. 유럽시장 진출"]
      },
    ]
  },
  {
    year: "2009",
    contents: [
      {
        month: "9월.",
        topic: "Tencent와 War Of Zombie(워오브좀비) 공동개발 계약체결"
      },
      {
        month: "4월.",
        topic: [<b>Blackshot</b>, " 싱가포르, 말레이시아 진출"]
      },
    ]
  },
  {
    year: "2008",
    contents: [
      {
        month: "9월.",
        topic: "THQ와의 파트너쉽 체결,"
      },
      {
        month: "",
        topic: "Smackdown VS Raw Online 공동개발 계약체결"
      },
    ]
  },
  {
    year: "2007",
    contents: [
      {
        month: "11월.",
        topic: [<b>Blackshot</b>, " 국내 서비스 시작"]
      }
    ]
  },
  {
    year: "2006",
    contents: [
      {
        month: "2월.",
        topic: [<b>권호</b>, " 서비스 시작",]
      },
      {
        month: "1월.",
        topic: [<b>버티고우 게임즈</b>, " 설립"]
      }
    ]
  },
]

const SIX_REASON = [
  {
    title: "<b>글로벌화</b> 전략",
    imgName: globalImg
  },
  {
    title: "<b>숙련된</b> 팀",
    imgName: teamImg
  },
  {
    title: "다양한 <b>결제수단</b>",
    imgName: paymentImg
  },
  {
    title: "<b>현지화</b> 서비스",
    imgName: locationImg
  },
  {
    title: "강력한 <b>커뮤니티</b>",
    imgName: communityImg
  },
  {
    title: "확실한 <b>솔루션</b>",
    imgName: solutionImg
  }
];

const SIDE_NAV_DATA = [
  {
    title: "History",
    isActive: false,
    hover: false
  },
  {
    title: "Papaya Play",
    isActive: false,
    hover: false
  },
  {
    title: "Vertigo Games",
    isActive: false,
    hover: false
  }
];

const CHARATER_DATA = [
  {
    name: 'char1',
    imgName: char1,
    dialogue: '우리는 꾸준히 성장 할꺼야<br/>우리를 지켜봐줘! '
  },
  {
    name: 'char2',
    imgName: char2,
    dialogue: 'Papaya Play에서 우리가 서비스 하는<br/> 게임들을 만나볼 수 있어 '
  },
  {
    name: 'char3',
    imgName: char3,
    dialogue: '우리는 계속해서 글로벌을 무대로<br/> 도전 할꺼야'
  },
  {
    name: 'char4',
    imgName: char4,
    dialogue: '우리의 Blackshot은 싱가포르 말레이시아에서<br/>FPS 1위 게임을 달성했어!'
  },
  {
    name: 'char5',
    imgName: char5,
    dialogue: 'Blackshot 등장!'
  }
];

export default AboutPage;
