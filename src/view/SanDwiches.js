import React, { Component } from 'react';
// import { HocRemoveProp, HoAddProp } from './senior/Sandwiches';
import HoAddProp from './senior/Sandwiches';
import sampleComponent from './senior/sampleComponent';
class San extends Component {
    render() {
        // const newComponent1 = HocRemoveProp(sampleComponent);
        const newComponent2 = HoAddProp(sampleComponent, '11111111');
        console.log(HoAddProp,'xxxxxxxxxxxx')
    
        return <div>
            {newComponent2}
        </div>
    }
}

export default San;