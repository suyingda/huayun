import React, { Component } from 'react';
import simpleHoc from './senior/Sandwiches';

class Usual extends Component {

  render() {


    // console.log(this.props, 'props');
    return (
      <div onClick={this.props.handleClick()}>
        senior  Component
       
      </div>
    )
  }
}
export default simpleHoc(Usual);
