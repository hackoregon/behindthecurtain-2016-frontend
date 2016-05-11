import React, { Component, PropTypes } from 'react';


class Photo extends Component {
  
  
  render() {

    return (
      <div className={this.props.imgDivClasses}>
        <img src={this.props.photo} className={this.props.imgClasses} alt={this.props.alt}/>
        <h4>{this.props.caption}</h4>
        
      </div>
    );
  }
}

Photo.propTypes = {
    caption: PropTypes.string,
    photo: PropTypes.string,
    imgDivClasses: PropTypes.string,
    imgClasses: PropTypes.string,
    alt: PropTypes.string
}

export default Photo;
