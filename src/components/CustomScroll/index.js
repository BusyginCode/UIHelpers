import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { documentMouseMove, documentMouseUp } from '../../utils';
import './custom-scroll.scss';

export default class ReactScroll extends Component {

  static propTypes = {
    children: PropTypes.any,
    scrollTrackComponent: PropTypes.object,
    scrollTrackClassName: PropTypes.string,
  }

  state = {
    resolution: null,
    pastMargin: null,
    margin: null,
    parentHeight: null,
    childHeight: null,
    scrollinbBlockHeight: null
  }

  componentDidMount() {
    this.setState({ // eslint-disable-line
      scrollinbBlockHeight: this.scrollBlockHeightCalculation()
    });
    this.initHeights();
  }

  componentWillUpdate() {
    this.state.scrollinbBlockHeight = this.scrollBlockHeightCalculation();
  }

  blocks = {
    scrollParrent: undefined,
    scrollChild: undefined,
    content: undefined,
    scroll: undefined,
  }

  initHeights() {
    this.state.parentHeight = this.blocks.scrollParrent.offsetHeight;
    this.state.childHeight = this.blocks.scrollChild.offsetHeight;
  }

  mouseFix = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.state.resolution = true;
    this.state.defaultY = e.clientY;
    this.state.pastMargin = this.state.margin;
    documentMouseUp.subscribe(this.mouseRelease);
    documentMouseMove.subscribe(this.mouseMove);
  }

  mouseRelease = () => {
    this.state.resolution = false;
    this.state.pastMargin = this.state.margin;
    documentMouseUp.unsubscribe(this.mouseRelease);
    documentMouseMove.unsubscribe(this.mouseMove);
  }

  scrollWheel = (e) => {
    this.initHeights();
    e.preventDefault();
    e.stopPropagation();
    const step = (e.deltaY / (this.blocks.content.offsetHeight / 100)) *
      (this.state.parentHeight / 100);
    if ((this.state.pastMargin + step >= 0) &&
      (this.state.pastMargin + step <= this.state.parentHeight - this.state.childHeight)
    ) {
      this.state.margin = this.state.margin + step;
      this.setState({
        margin: this.state.margin,
        pastMargin: this.state.margin
      });
      this.blocks.scroll.scrollTop = this.realScrollCalculate(this.state.margin);
    } else {
      this.edges(step);
    }
  }

  realScrollCalculate(fakeMargin) {
    return ((fakeMargin / (this.state.parentHeight / 100)) *
      (this.blocks.content.offsetHeight / 100)
    );
  }

  edges = (step) => {
    if (this.state.pastMargin + step < 0) {
      this.state.margin = 0;
      this.setState({
        margin: this.state.margin,
        pastMargin: this.state.margin
      });
    }
    if (this.state.pastMargin + step > this.state.parentHeight - this.state.childHeight) {
      this.state.margin = this.state.parentHeight - this.state.childHeight;
      this.setState({
        margin: this.state.margin
      });
    }
    this.blocks.scroll.scrollTop = this.realScrollCalculate(this.state.margin);
  }

  mouseMove = (e) => {
    this.initHeights();
    if (this.state.resolution) {
      const indentY = e.clientY - this.state.defaultY;
      if ((this.state.pastMargin + indentY >= 0) &&
        (this.state.pastMargin + indentY <= this.state.parentHeight - this.state.childHeight)
      ) {
        this.state.margin = Math.ceil(this.state.pastMargin + indentY);
      } else {
        this.edges(indentY);
      }
      this.blocks.scroll.scrollTop = this.realScrollCalculate(this.state.margin);
      this.forceUpdate();
    }
  }

  scrollBlockHeightCalculation() {
    return Math.round(((this.blocks.scroll.offsetHeight /
      (this.blocks.content.offsetHeight / 100)) *
      this.blocks.scroll.offsetHeight) / 100
    );
  }

  clickScroll = (e) => {
    e.stopPropagation();
    this.initHeights();
    let step = e.clientY - 140;
    if (step > this.state.parentHeight - this.state.childHeight) {
      step = this.state.parentHeight - this.state.childHeight;
    }
    this.setState({
      margin: step,
      pastMargin: step
    });
    this.blocks.scroll.scrollTop = this.realScrollCalculate(step);
  }

  render() {
    const {
      scrollTrackComponent,
      scrollTrackClassName,
    } = this.props;
    return (
      <div
        onMouseUp={this.mouseRelease}
        onWheel={this.scrollWheel}
        className="scroll"
      >
        <div
          ref={ref => (this.blocks.scroll = ref)}
          className="scroll__content"
        >
          <div ref={ref => (this.blocks.content = ref)}>
            {this.props.children}
          </div>
        </div>
        <div
          ref={ref => (this.blocks.scrollParrent = ref)}
          onMouseDown={this.clickScroll}
          className="scroll__bar"
        >
          <div
            style={{ height: `${this.state.scrollinbBlockHeight}px`, marginTop: `${this.state.margin}px` }}
            ref={ref => (this.blocks.scrollChild = ref)}
            className={classNames('scroll__track', {
              [scrollTrackClassName]: scrollTrackClassName,
              'scroll__track-disable': scrollTrackComponent,
            })}
            onMouseDown={this.mouseFix}
          >
            {scrollTrackComponent}
          </div>
        </div>
      </div>
    );
  }
}
