import React, { Component } from 'react';
import { HocRemoveProp } from './Sandwiches';
// @HocRemoveProp;
class sampleComponent extends Component {
    render() {
        return <input {...this.props.newProps} />
    }
}
export default sampleComponent;