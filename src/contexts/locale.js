import React, { Component, createContext } from 'react';
import createUseConsumer from "../lib/createUseConsumer";

import axios from 'axios';
import detectBrowserLanguage from 'detect-browser-language';


// initailize/create context
const Context = createContext();

const { Provider, Consumer: LocaleConsumer } = Context;

class LocaleProvider extends Component {
  state = { lang: detectBrowserLanguage(), localeJson: '' }

  actions = {
    setLang: (lang) => { this.setState({ lang }); },
    fetchJson: (lang) => {
      if (lang.includes('ko')) {
        //console.log(process.env.REACT_APP_LANGUAGE_KO)
        axios.get(process.env.REACT_APP_LANGUAGE_KO)
          .then(res => {
            this.setState({ localeJson: res.data })
          })
      } else {
        //console.log(process.env.REACT_APP_LANGUAGE_EN)
        axios.get(process.env.REACT_APP_LANGUAGE_EN)
          .then(res => {
            this.setState({ localeJson: res.data })
          })
      }
    }
  }
  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return (
      <Provider value={value}>{this.props.children}</Provider>
    )
  }
}

const useLanguage = createUseConsumer(LocaleConsumer);


export { LocaleProvider, LocaleConsumer, useLanguage };