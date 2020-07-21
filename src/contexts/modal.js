import React, { Component, createContext } from 'react';
import createUseConsumer from "../lib/createUseConsumer";

const Context = createContext();

const { Provider, Consumer: ModalConsumer } = Context;

class ModalProvider extends Component {
  state = {
    isModal: false,
    session: null
  }
  actions = {
    openModal: (session) => {
      this.setState({ isModal: true, session })
    },
    closeModal: () => {
      this.setState({ isModal: false, session: null })
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

const useModal = createUseConsumer(ModalConsumer);


export { ModalProvider, ModalConsumer, useModal };