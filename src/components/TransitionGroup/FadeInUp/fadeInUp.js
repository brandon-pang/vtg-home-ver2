import React from 'react';
import { CSSTransition, transit } from "react-css-transition";
import { CSSTransitionGroup } from "react-css-transition";

const FadeInUp = (props) => {
  <CSSTransition
    {...props}
    defaultStyle={{ opacity: 0 }}
    enterStyle={{ opacity: transit(1.0, 500, "ease-in-out") }}
    leaveStyle={{ opacity: transit(0, 500, "ease-in-out") }}
    activeStyle={{ opacity: 1.0 }}
  />
};

const FadeInUpGroup = (props) => {
  <CSSTransitionGroup {...props}>
  {
    React.Children.map(
      props.children,
      (child) => <FadeInUp>{child}</FadeInUp>,
    )
  }
</CSSTransitionGroup>
}

export default FadeInUpGroup;

