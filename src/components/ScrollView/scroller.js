import React, { Component } from 'react';
import { findDOMNode } from "react-dom"; // get access to the custom component DOM node.
import scrollIntoView from "scroll-into-view";
import PropTypes from "prop-types";

class ScrollView extends Component {
  static childContextTypes = {
    scroll: PropTypes.object,
  }
  elements = {};
  // register scroll section
  register = (title, ref) => {
    this.elements[title] = ref;
  }
  unregister = (title) => {
    delete this.elements[title];
  }
  getChildContext() {
    return {
      scroll: { 
        register: this.register,
        unregister: this.unregister
      }
    }
  }
  scrollTo = (title, time) => {
    const { topOffsett } = this.props;
    const node = findDOMNode(this.elements[title]);
    //console.log(topOffsett);
    scrollIntoView(node, {
      time: time,
      align: {
        top: 0,
        topOffset: topOffsett
      },
      ease: function (value) {
        return 1 - Math.pow(1 - value, value / 5);
      }
    })
  }
  render() {
    return ( 
      React.Children.only(this.props.children)
    );
  }
}


class ScrollElement extends Component {
  static contextTypes = {
    scroll: PropTypes.object,
  }
  componentDidMount() {
    this.context.scroll.register(this.props.title, this._element);
  }
  componentWillUnmount() {
    this.context.scroll.unregister(this.props.title);
  }
  render() { 
    return (
      // React.cloneElement will allow us to clone an element and
      // add addtional properties onto it
      React.cloneElement(this.props.children, {
        ref: ref => this._element = ref
      })
    );
  }
}
export {
  ScrollElement
}

export default ScrollView;