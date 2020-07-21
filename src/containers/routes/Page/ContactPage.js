import React, { Component } from "react";
import ReactHtmlParser from 'react-html-parser';
import _ from "lodash";
import moment from "moment-timezone";

import MastHead from "../../../components/MastHead/mastHead";
import EmailList from "../../../components/EmailList/emailList";
import EmailBox from "../../../components/EmailBox/emailBox";
import AnalogClock from "../../../components/AnalogClock/analogClock";
import ToolTip from "../../../components/Tooltip/toolTip";
import ScrollView, { ScrollElement } from "../../../components/ScrollView/scroller";
import NavToTop from "../../../components/NavToTop/navToTop";


import contactsImage from "../../../assets/images/bg/bg_main_contact.png";
import contactsMap from "../../../assets/images/acsy/map.png";
import mapIndicator from "../../../assets/images/acsy/ic_location.png";
import cancelIcon from "../../../assets/images/acsy/ic_cancel_w.png";
import "./pageStyle/contactPage.scss";

class ContactsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldTimes: [],
      tooltipActive: false,
      emailContainerActive: false,
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  emailOnClick = (index) => {
    for( let v = 0; v < EMAIL_DATA.length; v++) {
      if ( index === v ) {
        EMAIL_DATA[v].isActive = true;
        this.setState({ emailContainerActive: true })
      } else {
        EMAIL_DATA[v].isActive = false;
      }
    }
  }

  closeEmailContainer = () => {
    this.setState({ emailContainerActive: false })
    for (let v = 0; v < EMAIL_DATA.length; v++) {
      if (EMAIL_DATA[v].isActive) {
        EMAIL_DATA[v].isActive = false;  
      }
    }
  }

  tick() {
    const WORLDTIMES = [
      {
        city: 'Seoul, Korea',
        hours: moment().tz("Asia/Seoul").format('H'),
        minutes: moment().tz("Asia/Seoul").format('mm'),
        seconds: moment().tz("Asia/Seoul").format('ss')
      },
      {
        city: 'Vancouver, Canada',
        hours: moment().tz("America/Vancouver").format('H'),
        minutes: moment().tz("America/Vancouver").format('mm'),
        seconds: moment().tz("America/Vancouver").format('ss')
      },
      {
        city: 'Singapore',
        hours: moment().tz("Asia/Singapore").format('H'),
        minutes: moment().tz("Asia/Singapore").format('mm'),
        seconds: moment().tz("Asia/Singapore").format('ss')
      },
    ]
    this.setState({ worldTimes: WORLDTIMES })
  }
  // scroll to section
  scrollTo = (title) => {
    this._scroller.scrollTo(title, 500);
  }

  render() {
    const { worldTimes, emailContainerActive } = this.state;
    const { mobileSize, json} = this.props;
    //console.log(mobileSize);
    const title = json.contactspage_section_top_title;
    const subtitle = json.contactspage_section_top_subtitle;
    //const desc = json.contactspage_section_top_desc;

    for (let i = 0; i < EMAIL_DATA.length; i++) {
      if (json === '') {
        return ''
      } else {
        EMAIL_DATA[i].title = json.email_list_data[i].title;
        EMAIL_DATA[i].address = json.email_list_data[i].address;
      }
    }
    //console.log(worldTimes);
    return (
      <ScrollView ref={scroller => this._scroller = scroller}>
        <div className="contact_container">
          <ScrollElement title={'top'}>
            <div className="dim_layer" />
          </ScrollElement>
          <MastHead
            bgImage={contactsImage}
            title={title}
            subtitle={subtitle}
            scrollTo={this.scrollTo}
            below={'contactpage'}
          />
          <ScrollElement title="contactpage">
            <div className="contactpage_top"></div>
          </ScrollElement>
          <div className="contact_contents">
            <div className="contact_title">
              {json.contactspage_section_1_title}
            </div>
            <div className="orange_short" />
            <div className="contact_us_container"> 
              <p className="contact_us_desc">{ ReactHtmlParser(json.contactspage_contact_desc) }</p>
            </div>
            <div className="email_wrapper">
              {_.map(EMAIL_DATA, ({ title, address, isActive }, index) => {
                return (
                  <EmailList
                    title={title}
                    address={address}
                    key={index}
                    index={index}
                    isActive={isActive}
                    emailOnClick={this.emailOnClick}
                  />
                )
              })}
            </div>
            
            <div 
              className="send_email_container" 
              style={ emailContainerActive ? { height: '500px' } : { height: '0'} }
            >
              <button className="close_img_wrapper" onClick={() => this.closeEmailContainer()}>
                <img className="close--img" src={cancelIcon} alt='close' />
              </button>
              <EmailBox />
            </div>

            <div className="vertigo_contact_container">
              <div className="map_title">{json.contactpage_section_2_title}</div>
              <div className="map_orange_bar" />
              <div className="map_desc">
                {json.contactpage_section_2_desc}
              </div>
              <div className="vertigo_map_container">
                <img className="world_map" src={contactsMap} alt="vertigo_map" />
                <div className="location_container">
                  {
                    _.map(MAP_DATA, ({ name, imgName, location, address, contact, phoneNumber, mapLink }, index) => {
                      return (
                        <ToolTip
                          key={index}
                          name={name}
                          imgName={imgName}
                          location={location}
                          address={address}
                          contact={contact}
                          phoneNumber={phoneNumber}
                          mapLink={mapLink}
                        />
                      )
                    })
                  }
                </div>
              </div>

              {mobileSize ?
                <div className="timezone_container">
                  <div className="timezone_row_wrapper">
                    <div className="timezone_row">
                      {_.map(worldTimes, ({ city, hours, minutes, seconds }, index) => {
                        return (
                          <div className="timezone_col" key={index}>
                            <AnalogClock
                              city={city}
                              hours={hours}
                              minutes={minutes}
                              seconds={seconds}
                            />
                          </div>
                        )
                      })}
                    </div>
                    <div className="location_row">
                      {_.map(MAP_DATA, ({ mapLink, name }, index) => {
                        //console.log(name, mapLink);
                        return (
                          <div className="location_col" key={index}>
                            <a className="marks_wrapper" href={mapLink} target="blank">
                              <img src={mapIndicator} alt="map-indicator" />
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                :
                <div className="timezone_container">
                  <div className="timezone_inner_container">
                    {_.map(worldTimes, ({ city, hours, minutes, seconds }, index) => {
                      return (
                        <AnalogClock
                          key={index}
                          city={city}
                          hours={hours}
                          minutes={minutes}
                          seconds={seconds}
                        />
                      )
                    })}
                  </div>
                </div>
              }
            </div>
            <div className="last_section_nav">
              <NavToTop scrollTo={this.scrollTo} top={'top'} />
            </div>
          </div>
        </div>
      </ScrollView>
    );
  }
}

const EMAIL_DATA = [
  {
    title: "비지니스 문의",
    address: "biz@vertigogames.com",
    isActive: false,
  },
  {
    title: "일반 문의",
    address: "contact@vertigogames.com",
    isActive: false,
  },
  {
    title: "채용 문의",
    address: "job@vertigogames.com",
    isActive: false,
  }
]

const MAP_DATA = [
  {
    name: 'korea',
    imgName: mapIndicator,
    location: 'Seoul, Korean',
    address: '19F Dong Hoon Tower,<br/> 317, Teheran-ro, Gangnam-gu,<br/>Seoul, Korea 06151',
    contact: 'contact@vertigogames.com',
    phoneNumber: 'TEL +82+2-2051-9554',
    viewMore: 'View More',
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.168777377839!2d127.04356291578064!3d37.50393727980962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca405e6ad8b05%3A0x30bfa47aff4a4bb3!2z64yA7ZWc66-86rWtIOyEnOyauO2KueuzhOyLnCDqsJXrgqjqtawg7Jet7IK8MeuPmSDthYztl6TrnoDroZwgMzE3!5e0!3m2!1sko!2sca!4v1534974757441'
  },
  {
    name: 'canada',
    imgName: mapIndicator,
    location: 'Vancouver, Canada',
    address: 'Burnaby, BC V5C CANADA',
    contact: 'https://www.papayaplay.com',
    phoneNumber: '',
    viewMore: 'View More',
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20824.07873565812!2d-123.02019244780082!3d49.27621072714899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548670cb2e1f4fb3%3A0x82738ff87dd9cd6!2zVjVDIOu4jOumrO2LsOyLnOy7rOufvOu5hOyVhCDrsoTrhIjruYQ!5e0!3m2!1sko!2sca!4v1534974667828'
  },
  {
    name: 'singapore',
    imgName: mapIndicator,
    location: 'Singapore, Singapore',
    address: 'Singapore 068808',
    contact: 'https://www.papayaplay.com',
    phoneNumber: '',
    viewMore: 'View More',
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.82648834964!2d103.84712731534707!3d1.2775829990681777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1912345ffba1%3A0xdfe97016ced9b5bd!2zMDY4ODA47Iux6rCA7Y-s66W0IOmCruaUv-e8lueggTogMDY4ODA4!5e0!3m2!1sko!2sca!4v1534974607931'
  }
]

export default ContactsPage;
