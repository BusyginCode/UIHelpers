import React, { PropTypes } from 'react';

export default class Slider extends React.Component {

  static propTypes = {
    scrollStep: PropTypes.number,
    children: PropTypes.any,
  }

  state = {
    defaultY: null,
    resolution: null,
    margin: null,
    pastMargin: null,
    ourDeltaY: 0
  };

  sliderRef = undefined;

  initHeights() {
    this.state.parentHeight = this.sliderRef.parentNode.offsetHeight;
    this.state.childHeight = this.sliderRef.offsetHeight;
  }

  fixPosition = (e) => {
    this.state.resolution = true;
    this.state.defaultY = e.clientY;
    this.state.pastMargin = this.state.margin;
  }

  unFixPosition = () => {
    this.state.resolution = false;
  }

  mouseMove = (e) => {
    if (this.state.resolution) {
      const indentY = e.clientY - this.state.defaultY;
      if ((this.state.pastMargin + indentY <= 0) &&
        (this.state.pastMargin + indentY >= this.state.parentHeight - this.state.childHeight)
      ) {
        this.state.margin = this.state.pastMargin + indentY;
      }
      this.forceUpdate();
    }
  }

  wheelSlider = (e) => {
    this.initHeights();
    if (this.state.parentHeight - this.state.childHeight < 0) {
      e.preventDefault();
      if (this.props.scrollStep) {
        if (e.deltaY > 0) {
          this.state.ourDeltaY = this.props.scrollStep;
        } else {
          this.state.ourDeltaY = -this.props.scrollStep;
        }
      }
      const step = (this.props.scrollStep ? this.state.ourDeltaY : e.deltaY);
      if ((this.state.pastMargin - step <= 0) &&
        (this.state.pastMargin - step >= this.state.parentHeight - this.state.childHeight)
      ) {
        this.state.margin = this.state.pastMargin - step;
        this.state.pastMargin = this.state.pastMargin - step;
      } else if (!this.props.scrollStep) {
        if (this.state.pastMargin - e.deltaY >= 0) {
          this.state.margin = 0;
          this.state.pastMargin = 0;
        } else {
          this.state.margin = this.state.parentHeight - this.state.childHeight;
          this.state.pastMargin = this.state.parentHeight - this.state.childHeight;
        }
      }
    }
    this.forceUpdate();
  }

  render() {
    return (
      <div
        ref={(ref) => { this.sliderRef = ref; }}
        style={{ marginTop: this.state.margin }}
        onMouseLeave={this.unFixPosition}
        onMouseDown={this.fixPosition}
        onMouseUp={this.unFixPosition}
        onMouseMove={this.mouseMove}
        onWheel={this.wheelSlider}
      >
        {this.props.children}
      </div>
    );
  }
}
