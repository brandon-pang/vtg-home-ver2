import React, { Component } from 'react';

class DelayAnimation extends Component {
  static defaultProps = {
    period: 0
  }
  
  state = {
    value: this.props.initial
  }

  componentWillUnmount() {
    this.setState({ period: null })
  }
  
  componentDidMount() {
    this.refresh(this.props);
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    this.refresh(nextProps);
  }
  refresh = (props) => {
    const { value, period, hide } = props;

    if (hide) {
      setTimeout(() => this.setState({ value }), period);
    }
  }
  render() {
    return this.props.children(this.state.value);
  }
}

export default DelayAnimation;