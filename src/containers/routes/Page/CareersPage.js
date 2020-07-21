import React, { Component } from "react";
import ReactHtmlParser from 'react-html-parser';
import _ from "lodash";
import axios from "axios";
import Modal from 'react-modal';
import { Motion, spring } from "react-motion";

// custom components
import MastHead from "../../../components/MastHead/mastHead";
import NumberingBox from "../../../components/CareersNumber/numberingBox";
import VGLifeList from "../../../components/VGLifeList/vgLifeList";
import ContainerTitle from "../../../components/ContainerTitle/containerTitle";
import VGLifeBox from "../../../components/VGLifeBox/vgLifeBox";
import HireProcessCircle from "../../../components/HireProcessCircle/hireProcessCircle";
import StepList from "../../../components/StepsList/steps";
import SideNavBar from "../../../components/SideNavBar/sideNavBar";
import ScrollView, { ScrollElement } from "../../../components/ScrollView/scroller";
import HirePositionFilter from "../../../components/HirePositionFilter/hirePositionFilter";
import AccordionMenu from "../../../components/AccordionMenu/accordionMenu";
import NavToTop from "../../../components/NavToTop/navToTop";
import HireProcessList from "../../../components/HireProcessList/hireProcessList";
import Loader from "../../../components/Loading/loading";
import MobileHirePositionFilter from "../../../components/MobileHirePositionFilter/mobileHirePositionFilter";
import MobileHireList from "../../../components/MobileHirelist/mobileHirelist";
import HireModalContainer from "../../../components/HireModalContainer/hireModalContainer";

//  images
import careersImage from "../../../assets/images/bg/bg_main_careers.png";
import penImg from "../../../assets/images/careers_img/ic_pen.png";
import leadershipImg from "../../../assets/images/careers_img/ic_edu_leadership.png";
import eduEthicsImg from "../../../assets/images/careers_img/ic_edu_ethics.png";
import healthImg from "../../../assets/images/careers_img/ic_health.png";
import lifeImg from "../../../assets/images/careers_img/ic_life.png";
import cultureImg from "../../../assets/images/careers_img/ic_culture.png";
import downArrow from "../../../assets/images/acsy/ic_arrow_careers.png";

import "./pageStyle/careersPage.scss";
import quoteStart from "../../../assets/images/acsy/ic_t_mark_start.png";
import quoteEnd from "../../../assets/images/acsy/ic_t_mark_fin.png";

Modal.setAppElement('#root')
class CareersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hideNav: false,
      hirePositionVan: [],
      hirePositionSing: [],
      hirePositionKor: [],
      hirePositionVanCount: '',
      hirePositionSingCount: '',
      hirePositionKorCount: '',
      isActiveKor: true,
      isActiveVan: false,
      isActiveSing: false,
      dataRoute: 'http://cms.vertigogames.com/cms/wp-json/wp/v2/posts',
      activeCountry: '',
      openDropdown: false,
      hideHireButton: false,
      topLine: null,
      loadCareer: false
    }
    this.listenScrollNavEvent = this.listenScrollNavEvent.bind(this);
    this.scrollNavMenu = this.scrollNavMenu.bind(this);
    this.fetchWPPost = this.fetchWPPost.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    // hide nav bar when launched initially
    this.setState({ hideNav: true });
    this.fetchWPPost();
    window.addEventListener("scroll", this.listenScrollNavEvent);
    window.addEventListener("scroll", this.scrollNavMenu);
  }

  componentDidUpdate(prevProps, prevState) {
    const { hirePositionVan, hirePositionSing, hirePositionKor } = this.state;
    const { mobileSize } = this.props;
    if (prevState.hirePositionVan !== hirePositionVan 
      || prevState.hirePositionSing !== hirePositionSing 
      || prevState.hirePositionKor !== hirePositionKor ) {
        this.setState({ loading: false })
        //console.log(this.state.loading);
    }
    if (prevProps.mobileSize !== mobileSize) {
      this.setState({ topLine: -299 })
    }
  }

  componentWillUnmount() {
    this.signal.cancel('career api is being canceled');
    window.removeEventListener("scroll", this.listenScrollNavEvent);
    window.removeEventListener("scroll", this.scrollNavMenu);
    clearTimeout(this.hideNavTimer);
  }
  
  signal = axios.CancelToken.source();
  // fetch WP post
  fetchWPPost = async () => {
    this.setState({ loading: true })
    this.setState({ loadCareer: true })
    try {
      await axios.get(this.state.dataRoute, { cancelToken: this.signal.token })
        .then(res => {
          // categorize 1 = Uncategorized
          // categorize 5 = seoul
          // categorize 4 = singapore
          // categorize 3 = vancouver

          // filtered categories
          const hirePositionVan = _.filter(res.data, ['categories', [3]]);
          const hirePositionSing = _.filter(res.data, ['categories', [4]]);
          const hirePositionKor = _.filter(res.data, ['categories', [5]]);

          // count hire data 
          const hirePositionVanCount = Object.keys(hirePositionVan).length;
          const hirePositionSingCount = Object.keys(hirePositionSing).length;
          const hirePositionKorCount = Object.keys(hirePositionKor).length;

          // set state array data
          this.setState({
            hirePositionVan,
            hirePositionSing,
            hirePositionKor
          })

          // set state count
          this.setState({
            hirePositionVanCount,
            hirePositionSingCount,
            hirePositionKorCount,
            loading: false
          });
        })
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled
      } else {
        this.setState({ loadCareer: false })
      }
    }
  }



  // side navbar event function
  listenScrollNavEvent = () => {
    const { topLine } = this.state;
    const { mobileSize } = this.props;
    const lastSection = this.ls.offsetTop;
    const sideNavBar = this.sn.getBoundingClientRect();
    const hireButton = this.hb.getBoundingClientRect().bottom;
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
      //console.log('reached');
      this.setState({ hideNav: true });
      //console.log (this.state.hideNav);
    } else {
      this.setState({ hideNav: false });
    }
    // hire button appear / disappear
    
    if(hireButton > this.ls.getBoundingClientRect().top) {
      this.setState({ hideHireButton: true })
    } else {
      this.setState({ hideHireButton: false })
    }

    // when it reaches footer hide the nav
    if (window.pageYOffset + 560 > lastSection) {
      this.setState({ hideNav: true });
    }
  }

  scrollNavMenu = () => {
    const sideNavBar = this.sn.getBoundingClientRect().top * 0;
    const hrContainer = this.hrContainer.getBoundingClientRect().top;
    const lifeContainer = this.lifeContainer.getBoundingClientRect().top;
    const hProcessContainer = this.hProcessContainer.getBoundingClientRect().top;
    const hPositionContainer = this.hPositionContainer.getBoundingClientRect().top;

    if (sideNavBar >= hrContainer && sideNavBar <= lifeContainer) {
      //console.log('section1');
      SIDE_NAV_DATA[3].isActive = true;
      SIDE_NAV_DATA[1].isActive = false;
      SIDE_NAV_DATA[2].isActive = false;
      SIDE_NAV_DATA[0].isActive = false;
    }
    if (sideNavBar >= lifeContainer && sideNavBar <= hProcessContainer) {
      //console.log('section2');
      SIDE_NAV_DATA[2].isActive = true;
      SIDE_NAV_DATA[0].isActive = false;
      SIDE_NAV_DATA[1].isActive = false;
      SIDE_NAV_DATA[3].isActive = false;
    }
    if (sideNavBar >= hProcessContainer && sideNavBar <= hPositionContainer) {
      //console.log('section2');
      SIDE_NAV_DATA[1].isActive = true;
      SIDE_NAV_DATA[0].isActive = false;
      SIDE_NAV_DATA[2].isActive = false;
      SIDE_NAV_DATA[3].isActive = false;
    }
    if (sideNavBar >= hPositionContainer) {
      //console.log('section3');
      SIDE_NAV_DATA[0].isActive = true;
      SIDE_NAV_DATA[1].isActive = false;
      SIDE_NAV_DATA[3].isActive = false;
      SIDE_NAV_DATA[2].isActive = false;
    }
  }

  // scroll to section
  scrollTo = (title) => {
    this._scroller.scrollTo(title, 500);
  }

  dropdownOpen = () => {
    this.setState({ openDropdown: !this.state.openDropdown });
  }

  onFilterClick = (e) => {
    if (e.target.value === 'Seoul') {
      this.setState({
        isActiveKor: true,
        isActiveVan: false,
        isActiveSing: false,
        openDropdown: false
      });
    }
    if (e.target.value === 'Vancouver') {
      this.setState({
        isActiveKor: false,
        isActiveVan: true,
        isActiveSing: false,
        openDropdown: false
      });
    }
    if (e.target.value === 'Singapore') {
      this.setState({
        isActiveKor: false,
        isActiveVan: false,
        isActiveSing: true,
        openDropdown: false
      });
    }
  }
  render() {
    const {
      hideNav,
      hirePositionKor,
      hirePositionVan,
      hirePositionSing,
      hirePositionVanCount,
      hirePositionSingCount,
      hirePositionKorCount,
      isActiveKor,
      isActiveVan,
      isActiveSing,
      loading,
      openDropdown,
      hideHireButton
    } = this.state;
    const { mobileSize, json, history } = this.props;
    //console.log(hirePositionKor);
    const imgUrl = careersImage;
    const title = json.careers_section_top_title;
    const subtitle = json.careers_section_top_subtitle;
    //const desc = json.careers_section_top_desc;

    for (let i = 0; i < LIFEBOX_DATA_TOP.length; i++) {
      if (json === '') {
        return ''
      } else {
        LIFEBOX_DATA_TOP[i].title = json.lifebox_data_top[i].title;
        LIFEBOX_DATA_TOP[i].list = json.lifebox_data_top[i].list;
      }
    }
    for (let i = 0; i < LIFEBOX_DATA_BOTTOM.length; i++) {
      if (json === '') {
        return ''
      } else {
        LIFEBOX_DATA_BOTTOM[i].title = json.lifebox_data_bottom[i].title;
        LIFEBOX_DATA_BOTTOM[i].list = json.lifebox_data_bottom[i].list;
      }
    }
    for (let i = 0; i < firstStepsData.length; i++) {
      if (json === '') {
        return ''
      } else {
        firstStepsData[i] = json.first_step_data[i];
      }
    }
    for (let i = 0; i < secondStepsData.length; i++) {
      if (json === '') {
        return ''
      } else {
        secondStepsData[i] = json.second_step_data[i];
      }
    }
    for (let i = 0; i < thirdStepsData.length; i++) {
      if (json === '') {
        return ''
      } else {
        thirdStepsData[i] = json.third_step_data[i];
      }
    }

    return ( 
      <ScrollView ref={scroller => this._scroller = scroller} topOffsett={mobileSize ? 50 : 80}>
        <div className="careers_container">
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
          <MastHead
            bgImage={imgUrl}
            title={title}
            subtitle={subtitle}
            scrollTo={this.scrollTo}
            below={'careerpage'}
          />

          <ScrollElement title="careerpage">
            <div className="careerpage_top"></div>
          </ScrollElement>
          <div className="scroller">
            <div className="careersBodyContents">
              <Motion
                defaultStyle={hideHireButton ? { translateY: 0 } : { translateY: 300 }}
                style={hideHireButton ? { translateY: spring(300) } : { translateY: spring(0) }}
              >
                {value =>
                  <div
                    ref={hb => { this.hb = hb }}
                    className="nav_to_hirePosition"
                    style={{ transform: `translateY(${value.translateY}%)` }}
                    onClick={() => this.scrollTo(SIDE_NAV_DATA[0].title)}
                  >
                    {json.careers_section_hire_button}
                    <img className="nav_down_arrow" src={downArrow} alt="down" />
                  </div>
                }

              </Motion>
              <div ref={vg => { this.hrContainer = vg }}></div>
              <ScrollElement title={SIDE_NAV_DATA[3].title}>
                <div className="careers_intro">
                  <ContainerTitle
                    title={json.careers_section_1_title}
                    color={"orange"}
                  />
                  <div className="intro_goal_header">
                    <img className="quoteStart" src={quoteStart} alt="quote_start" />
                    <p className="goal_desc">{ ReactHtmlParser(json.careers_section_1_goal_desc) }</p>
                    <img className="quoteEnd" src={quoteEnd} alt="quote_end" />
                  </div>
                  <div className="intro_goal_body">
                    <NumberingBox
                      name={"number_1"}
                      number={1}
                      title={json.careers_number_box_title_1}
                      desc={json.careers_number_box_desc_1}
                    />
                    <NumberingBox
                      name={"number_2"}
                      number={2}
                      title={json.careers_number_box_title_2}
                      desc={json.careers_number_box_desc_2}
                    />
                    <NumberingBox
                      name={"number_3"}
                      number={3}
                      title={json.careers_number_box_title_3}
                      desc={json.careers_number_box_desc_3}
                    />
                  </div>
                </div>
              </ScrollElement>


              <div ref={vg => { this.lifeContainer = vg }}></div>
              <ScrollElement title={SIDE_NAV_DATA[2].title}>
                <div className="vertigo_games_life_container">
                  <ContainerTitle
                    title={json.careers_section_2_title}
                    color={"orange"}
                  />
                  <div className="life_container">
                    <VGLifeList
                      number={"01"}
                      title={json.careers_vglife_title_1}
                      desc={json.careers_vglife_desc_1}
                    />
                    <VGLifeList
                      number={"02"}
                      title={json.careers_vglife_title_2}
                      desc={json.careers_vglife_desc_2}
                    />
                    <div className="vgLifeBox_wrapper_top">
                      <div className="vgLifeBox_container_top">
                        {_.map(LIFEBOX_DATA_TOP, ({ icon, title, list }, index) => {
                          return (
                            <VGLifeBox
                              key={index}
                              size={"short"}
                              icon={icon}
                              title={title}
                              list={list}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <VGLifeList number={"03"} title={json.careers_vglife_title3} />
                    <div className="vgLifeBox_wrapper_bottom">
                      <div className="vgLifeBox_container_bottom">
                        {_.map(LIFEBOX_DATA_BOTTOM, ({ icon, title, list }, index) => {
                          return (
                            <VGLifeBox
                              key={index}
                              size={"long"}
                              icon={icon}
                              title={title}
                              list={list}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollElement>

              <div ref={vg => { this.hProcessContainer = vg }}></div>
              <ScrollElement title={SIDE_NAV_DATA[1].title}>
                <div className="hire_process_container">
                  <ContainerTitle title={json.careers_section_3_title} color={"orange"} />
                  {mobileSize ?
                    (<div className="process_diagram_wrapper">
                      <HireProcessList
                        number={"01"}
                        title={json.hire_process_list_title_1}
                        steps={firstStepsData}
                      />
                      <HireProcessList
                        number={"02"}
                        title={json.hire_process_list_title_2}
                        steps={secondStepsData}
                      />
                      <HireProcessList
                        number={"03"}
                        title={json.hire_process_list_title_3}
                        steps={thirdStepsData}
                      />
                      <HireProcessList
                        number={"04"}
                        title={json.hire_process_list_title_4}
                      />
                    </div>)
                    :
                    (<div className="process_diagram_wrapper">
                      <div className="process_diagram">
                        <div className="diagram_line" />
                        <div className="orange_vertical_line" />
                        <HireProcessCircle
                          size={"small"}
                          number={"01"}
                          desc={json.hire_process_list_title_1}
                        />
                        <HireProcessCircle
                          size={"large"}
                          number={"02"}
                          desc={json.hire_process_list_title_2}
                        />
                        <HireProcessCircle
                          size={"medium"}
                          number={"03"}
                          desc={json.hire_process_list_title_3}
                        />
                        <HireProcessCircle
                          size={"small"}
                          number={"04"}
                          desc={json.hire_process_list_title_4}
                        />
                      </div>
                      <div className="steps_container">
                        <StepList steps={firstStepsData} index={1} />
                        <StepList steps={secondStepsData} index={2} />
                        <StepList steps={thirdStepsData} index={3} />
                      </div>
                    </div>)
                  }
                  <div className="process_info">{ ReactHtmlParser(json.process_info) }</div>
                </div>
              </ScrollElement>

              <div ref={vg => { this.hPositionContainer = vg }}></div>
              <ScrollElement title={SIDE_NAV_DATA[0].title}>
                <div className="hire_position_title">
                  <ContainerTitle title={json.careers_section_4_title} color={"orange"} />
                </div>
              </ScrollElement>
              {
                loading ? <Loader /> :
                  <div className="hire_position_container" id="hiring">
                    {mobileSize ?
                      <MobileHirePositionFilter
                        openDropdown={openDropdown}
                        vanCount={hirePositionVanCount}
                        singCount={hirePositionSingCount}
                        korCount={hirePositionKorCount}
                        isActiveKor={isActiveKor}
                        isActiveVan={isActiveVan}
                        isActiveSing={isActiveSing}
                        onFilterClick={this.onFilterClick}
                        dropdownOpen={this.dropdownOpen}
                      />
                      :
                      <HirePositionFilter
                        vanCount={hirePositionVanCount}
                        singCount={hirePositionSingCount}
                        korCount={hirePositionKorCount}
                        isActiveKor={isActiveKor}
                        isActiveVan={isActiveVan}
                        isActiveSing={isActiveSing}
                        onFilterClick={this.onFilterClick}
                      />
                    }
                    {!mobileSize ?
                      <div className="accordion_container">
                        {isActiveKor ?
                          <div className="korea_accordion_container">
                            {hirePositionKor.length === 0 ?
                              // 현재 고용중인 포지션이 없습니다.
                              <div className="no_hire_wrapper">{ ReactHtmlParser(json.careers_section_4_no_hire) }</div>
                              :
                              <div>
                                {_.map(hirePositionKor, ({ title, content, hire_department, hire_location }, index) => {
                                  return (
                                    <AccordionMenu
                                      hirePosition={hirePositionKor}
                                      title={title.rendered}
                                      content={content.rendered}
                                      department={hire_department}
                                      location={hire_location}
                                      key={index}
                                    />
                                  )
                                })}
                              </div>
                            }
                          </div> : null}
                        {isActiveVan ?
                          <div className="vancouver_accordion_container">
                            {hirePositionVan.length === 0 ?
                              // 현재 고용중인 포지션이 없습니다.
                              <div className="no_hire_wrapper">{ReactHtmlParser(json.careers_section_4_no_hire)}</div>
                              :
                              <div>
                                {_.map(hirePositionVan, ({ title, content, hire_department, hire_location }, index) => {
                                  return (
                                    <AccordionMenu
                                      hirePosition={hirePositionVan}
                                      title={title.rendered}
                                      content={content.rendered}
                                      department={hire_department}
                                      location={hire_location}
                                      key={index}
                                    />
                                  )
                                })}
                              </div>
                            }
                          </div> : null}
                        {isActiveSing ?
                          <div className="singapore_accordion_container">
                            {hirePositionSing.length === 0 ?
                              // 현재 고용중인 포지션이 없습니다.
                              <div className="no_hire_wrapper">{ ReactHtmlParser(json.careers_section_4_no_hire) }</div>
                              :
                              <div>
                                {_.map(hirePositionSing, ({ title, content, hire_department, hire_location }, index) => {
                                  return (
                                    <AccordionMenu
                                      hirePosition={hirePositionSing}
                                      title={title.rendered}
                                      content={content.rendered}
                                      department={hire_department}
                                      location={hire_location}
                                      key={index}
                                    />
                                  )
                                })}
                              </div>
                            }
                          </div> : null}
                      </div>
                      :
                      <div className="mobile_hirelist_container">
                        {
                          isActiveKor ?
                            <div className="korea_hire_list_mobile">
                              {hirePositionKor.length === 0 ?
                                // 현재 고용중인 포지션이 없습니다.
                                <div className="no_hire_wrapper">{ ReactHtmlParser(json.careers_section_4_no_hire) }</div>
                                :
                                <div>
                                  {_.map(hirePositionKor, ({ title, hire_department, hire_location }, index) => {
                                    return (
                                      <MobileHireList
                                        title={title.rendered}
                                        department={hire_department}
                                        location={hire_location}
                                        key={index}
                                        index={index}
                                      />
                                    )
                                  })}
                                </div>
                              }
                            </div> : null
                        }
                        {
                          isActiveVan ?
                            <div className="vancouver_hire_list_mobile">
                              {hirePositionVan.length === 0 ?
                                // 현재 고용중인 포지션이 없습니다.
                                <div className="no_hire_wrapper">{ReactHtmlParser(json.careers_section_4_no_hire)}</div>
                                :
                                <div>
                                  {_.map(hirePositionVan, ({ title, hire_department, hire_location }, index) => {
                                    return (
                                      <MobileHireList
                                        title={title.rendered}
                                        department={hire_department}
                                        location={hire_location}
                                        key={index}
                                        index={index}
                                      />
                                    )
                                  })}
                                </div>
                              }
                            </div> : null
                        }
                        {
                          isActiveSing ?
                            <div className="singapore_hire_list_mobile">
                              {hirePositionSing.length === 0 ?
                                // 현재 고용중인 포지션이 없습니다.
                                <div className="no_hire_wrapper">{ReactHtmlParser(json.careers_section_4_no_hire)}</div>
                                :
                                <div>
                                  {_.map(hirePositionSing, ({ title, hire_department, hire_location }, index) => {
                                    return (
                                      <MobileHireList
                                        title={title.rendered}
                                        department={hire_department}
                                        location={hire_location}
                                        key={index}
                                        index={index}
                                      />
                                    )
                                  })}
                                </div>
                              }
                            </div> : null
                        }
                        {/* modal */}
                        {mobileSize && isActiveKor ? <HireModalContainer hireData={hirePositionKor} history={history} mobileSize={mobileSize} email='job@vertigogames.com'/> : null}
                        {mobileSize && isActiveVan ? <HireModalContainer hireData={hirePositionVan} history={history} mobileSize={mobileSize} email='vancouver.hr@vertigogames.com'/> : null}
                        {mobileSize && isActiveSing ? <HireModalContainer hireData={hirePositionSing} history={history} mobileSize={mobileSize} email='job@vertigogames.com'/> : null}
                      </div>
                    }
                  </div>
              }
            </div>
          </div>

          <div className="last_section_nav" ref={ls => {this.ls = ls}}>
            <NavToTop scrollTo={this.scrollTo} top={'top'} />
          </div>
        </div>
      </ScrollView>
    );
  }
}

const SIDE_NAV_DATA = [
  {
    title: "Position",
    isActive: false
  },
  {
    title: "Hire Process",
    isActive: false
  },
  {
    title: "Vertigo Life",
    isActive: false
  },
  {
    title: "Vertigo HR",
    isActive: false
  }
];
const LIFEBOX_DATA_TOP = [
  {
    icon: penImg,
    title: "직무교육",
    list: ["전산시스템 교육", "오피스프로그램 교육"]
  },
  {
    icon: leadershipImg,
    title: "리더십 교육",
    list: ["신입사원 교육", "팀장교육", "임원교육"]
  },
  {
    icon: eduEthicsImg,
    title: "윤리교육",
    list: ["버티고우게임즈 윤리강령교육", "성희롱예방교육", "안전/보건교육"]
  }
];
const LIFEBOX_DATA_BOTTOM = [
  {
    icon: healthImg,
    title: "직원들의 건강",
    list: ["건강검진 / 상해보험", "휴양시설 & 선택적 복리후생"]
  },
  {
    icon: lifeImg,
    title: "Work and Life Balance",
    list: [
      "경조사 지원&휴가",
      "시차출퇴근제 운영",
      "금요일 조기퇴근",
      "생일/기념일 반차 제공 예정"
    ]
  },
  {
    icon: cultureImg,
    title: "신뢰할 수 있는 기업 문화 ",
    list: [
      "팀 운영비 / 워크샵",
      "장기 근속 프로그램 및 연차에",
      "따른 휴가 지원금 및 휴가 지원",
      "복지카드 제공",
      "도서실 및 사내카페 운영 예정"
    ]
  }
];

const firstStepsData = [
  "이력서",
  "자기소개서",
  "경력기술서",
  "포트폴리오",
  "기반 평가"
];
const secondStepsData = [
  "팀",
  "직군 담당자 면접",
  "실무능력",
  "전문지식",
  "업무 수행 능력 검토"
];
const thirdStepsData = ["업무 능력 및 문화 적합도", "인성 등을 검증"];



export default CareersPage;
