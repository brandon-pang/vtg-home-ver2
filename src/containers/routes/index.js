import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useLanguage } from "../../contexts/locale";
import CookieConsent from "react-cookie-consent";


import GNB from "../../components/GNB/gnb";
import MainPage from "./Page/MainPage";
import AboutPage from "./Page/AboutPage";
import GamePage from "./Page/GamePage";
import NewsPage from "./Page/NewsPage";
import CareersPage from "./Page/CareersPage";
import ContactPage from "./Page/ContactPage";
import Footer from "../../components/Footer/footer"


class RoutesNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      tabletSize: false,
      mobileSize: false,
    };
  }

  componentDidMount() {
    const { localeLang, fetchJson } = this.props;
    fetchJson(localeLang);
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    const { localeLang, fetchJson } = this.props;
    const { mobileSize, tabletSize } = this.state;

    if (localeLang !== prevProps.localeLang) {
      fetchJson(localeLang);
    }
    if ((prevState.mobileSize !== mobileSize) || (prevState.tabletSize !== tabletSize)) {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  // check window width
  handleResize = () => {
    //const { mobileSize, tabletSize } = this.state;
    this.setState({ tabletSize: window.innerWidth <= 768 && window.innerWidth > 480 });
    this.setState({ mobileSize: window.innerWidth <= 480 });
    //console.log('mobile', mobileSize)
  }

  render() {
    const { tabletSize, mobileSize } = this.state;
    const { localeJson } = this.props;
    return (
      <Router>
        <div>
          <GNB tabletSize={tabletSize} mobileSize={mobileSize} />
          <Switch>
            <Route
              exact path="/"
              render={(props) => <MainPage {...props} tabletSize={tabletSize} mobileSize={mobileSize} json={localeJson} />}
            />
            <Route
              exact path="/about"
              render={(props) => <AboutPage {...props} tabletSize={tabletSize} mobileSize={mobileSize} json={localeJson}/>}
            />
            <Route
              exact path="/game"
              render={(props) => <GamePage {...props} tabletSize={tabletSize} mobileSize={mobileSize} json={localeJson} />}
            />
            <Route
              exact path="/news"
              render={(props) => <NewsPage {...props} tabletSize={tabletSize} mobileSize={mobileSize} json={localeJson}/>}
            />
            <Route
              exact path="/careers"
              render={(props) => <CareersPage {...props} tabletSize={tabletSize} mobileSize={mobileSize} json={localeJson} />}
            />
            <Route
              exact path="/contacts"
              render={(props) => <ContactPage {...props} tabletSize={tabletSize} mobileSize={mobileSize} json={localeJson} />}
            />
          </Switch>
          <Footer tabletSize={tabletSize} mobileSize={mobileSize} />
          <CookieConsent location="bottom" expires={150}>
            We use cookies to personalize and enhance your experience on our site. By using our site, you agree to our use of cookies.
          </CookieConsent>
        </div>
      </Router>
    );
  }
}

export default useLanguage(({ state, actions }) => ({
  localeLang: state.lang,
  localeJson: state.localeJson,
  fetchJson: actions.fetchJson
}))(RoutesNav);
