import React, { Component, PropTypes } from 'react';

class TextContainer extends Component {
  render(){
    return (
      <div className={this.props.divClasses}>
        {this.props.children}
      </div>
    );
  }
}

TextContainer.propTypes = {
    divClasses: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string,PropTypes.array, PropTypes.object])
}

export default TextContainer;
