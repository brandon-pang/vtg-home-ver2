import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

// custom component
import FullGNB from "./common/fullpageNav/fullGNB";
import MobileGNB from "./common/mobilepageNav/mobileGNB";
import LangNav from "../LangMenu/langNav";

// images
import vertigoLogo from "../../assets/images/bg/vertigogames_w.png";
import vertigoSymbol from "../../assets/images/acsy/vertigo_symbol.png";

//style
import "./gnb.scss";


const MENU = [
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Games",
    link: "/game",
  },
  {
    name: "News",
    link: "/news",
  },
  {
    name: "Careers",
    link: "/careers",
  },
  {
    name: "Contacts",
    link: "/contacts",
  }
];
class GNB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScrollHeight: null,
      isReachedTop: false,
      isNavActive: false,
      gnbTopHeightOpacity: 600,
      menuToggleClass: 'mobileNavButton'
    };
  }

  componentDidMount() {
    this.setState({ isReachedTop: true });
    window.addEventListener("scroll", this.listenScrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScrollEvent);
  }

  componentDidUpdate(prevProps, prevState) {
    const { mobileSize } = this.props;
    if (prevProps.mobileSize !== mobileSize) {
      this.setState({ gnbTopHeightOpacity: 304 })
    }
  }

  // handle scroll event
  listenScrollEvent = () => {
    // set initial gnb style value
    this.setState({ isReachedTop: true, currentScrollHeight: window.pageYOffset });
    // if scroll height reaches 0
    if (this.state.currentScrollHeight === 0) {
      this.setState({ isReachedTop: true });
    } else {
      this.setState({ isReachedTop: false });
    }
  }

  onClickMenu = () => {
    this.setState({ isNavActive: false, menuToggleClass: 'mobileNavButton' });
  }

  onClickNav = () => {
    this.setState({ isNavActive: !this.state.isNavActive, menuToggleClass: this.state.isNavActive ? 'mobileNavButton' : 'mobileNavButton open' });
  }

  render() {
    //console.log(this.props);
    const {
      currentScrollHeight,
      isReachedTop,
      isNavActive,
      gnbTopHeightOpacity,
      menuToggleClass
    } = this.state;
    const { tabletSize, mobileSize } = this.props;
    //console.log(this.props);
    // calculate opacity
    const opacity = Math.min(currentScrollHeight / gnbTopHeightOpacity, 1);
    // when its scroll
    const gnbScrollStyle = {
      backgroundColor: "#000",
      opacity: opacity
    };
    // when it reaches top
    const gnbStyle = {
      backgroundColor: "transparent"
    };
    const menuActiveStyle = {
      color: '#fff'
    };
    const mobileMenuActiveStyle = {
      color: '#ff8300',
      opacity: 1
    };
    const navOpenStyle = {
      right: 0,
      transition: "0.5s"
    }
    const navCloseStyle = {
      right: "-500px",
      transition: "0.5s"
    }



    // render Navigation
    const renderNav = (name, link, index) => {
      if (tabletSize || mobileSize) {
        return [
          <MobileGNB
            menu={name}
            style={mobileMenuActiveStyle}
            key={index}
            link={link}
            onClick={() => this.onClickMenu()}
          />
        ]
      } else {
        return [
          <FullGNB
            menu={name}
            style={menuActiveStyle}
            key={index}
            link={link}
          />
        ]
      }
    }
    return (

      <div className="gnb_container" style={isReachedTop ? gnbStyle : gnbScrollStyle}>
        <div className="gnb_inner_container">
          <div className="vertigo_logo">
            <Link to="/" >
              {mobileSize ? <img src={vertigoSymbol} alt="vLogoSmall" /> : <img className="navVertigoLogo" src={vertigoLogo} alt="navVertigoLogo" />}
            </Link>
          </div>

          <div className="menu_container" style={isNavActive ? navOpenStyle : navCloseStyle}>
            {/* <div className="menu_container"> */}
            <Link to="/" onClick={this.onClickMenu}>
              {tabletSize || mobileSize ? <img className="navVertigoLogo" src={vertigoLogo} alt="navVertigoLogo" /> : null}
            </Link>
            {_.map(MENU, ({ name, link }, index) => {
              return (
                renderNav(name, link, index)
              )
            })}
            <LangNav tabletSize={tabletSize} mobileSize={mobileSize} closeMenu={() => this.onClickMenu()}/>
          </div>
          {
            tabletSize || mobileSize ?
              <div className={menuToggleClass} onClick={this.onClickNav}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              :
              null
          }
        </div>
      </div>
    );
  }
}

export default GNB;
