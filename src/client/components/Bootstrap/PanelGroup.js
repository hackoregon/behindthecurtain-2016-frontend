import React, {Component, PropTypes} from 'react';
import * as ReactBootstrap from 'react-bootstrap';

class PanelGroup extends Component {

    renderChildren(){
        let eventKeyCount = 0;
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {eventKey: ++eventKeyCount});
        });
    }

    render(){
        return (
            <ReactBootstrap.PanelGroup {...this.props}>
                {this.renderChildren()}
            </ReactBootstrap.PanelGroup>
        );
    }
}

PanelGroup.propTypes = {
    children: PropTypes.array
}

export default PanelGroup;
