import React, { Component } from 'react';

const simpleHoc = WrappedComponent => {
    console.log('simpleHoc');
    return class extends Component {
        handleClick = () => {
            console.log('click');
        }
        render() {
            // console.log(this.props, 'x');
            return <WrappedComponent
                handleClick={this.handleClick}
                {...this.props}
            />
        }
    }
}
export default simpleHoc;