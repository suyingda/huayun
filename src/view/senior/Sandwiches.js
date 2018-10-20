import React, { Component } from "react";


/* function HocRemoveProp(WrappedComponent) {
    return class WrappingComponent extends Component {
        render() {
            const { user, ...otherProps } = this.props;
            return <WrappedComponent {...otherProps} />
        }
    }
}; */
const HoAddProp = (WrappedComponent, uid) => {
    class WrappingComponent extends Component {
        render() {
            console.log(WrappedComponent,uid,'get date')
            const newProps = {
                uid
            }
            return <WrappedComponent {...this.props} {...newProps} />
        }
    }
};

// export { HocRemoveProp, HoAddProp };
export  default HoAddProp ;
