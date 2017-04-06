import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { documentMouseUp } from 'utils';
import './carousel.scss';

export default class Carousel extends Component {

  constructor() {
    super();
    this.state = {
      animationSpeed: 1,
      parentHeight: null,
      childHeight: null,
      resolution: null,
      defaultY: null,
      pastMargin: null
    };
    this.fixPosition = this.fixPosition.bind(this);
    this.unFixPosition = this.unFixPosition.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }

  scrollClick(path) {
    const nextScroll = this.props.scrollLength * (path ? -1 : 1);
    this.scroll(nextScroll, this.state.animationSpeed * (path ? -1 : 1));
  }

  scroll(nextScroll, animation) {
    let key = 0,
      nextScrollSave = nextScroll,
      keyCounter = 0;
    const move = setInterval(() => {
      key += animation;
      keyCounter += key;
      ReactDOM.findDOMNode(this.refs.carouselContainer).scrollLeft += key;
      nextScroll -= key;
      if ((keyCounter >= nextScrollSave / 2 && key > 0) || (keyCounter <= nextScrollSave / 2 && key < 0)) {
        clearInterval(move);
        const moveSlower = setInterval(() => {
          key -= animation;
          ReactDOM.findDOMNode(this.refs.carouselContainer).scrollLeft += key;
          nextScroll -= key;
          if (key === 0) {
            clearInterval(moveSlower);
          }
        }, 18);
      }
    }, 18);
  }

  initHeights() {
    this.state.parentHeight = (this.props.direction != 'vertical' ? ReactDOM.findDOMNode(this.refs.carouselContainer).offsetWidth : ReactDOM.findDOMNode(this.refs.carouselContainer).offsetHeight);
    this.state.childHeight = (this.props.direction != 'vertical' ? ReactDOM.findDOMNode(this.refs.ribbon).offsetWidth : ReactDOM.findDOMNode(this.refs.ribbon).offsetHeight);
  }

  fixPosition(e) {
    this.initHeights();
    this.state.resolution = true;
    this.state.defaultY = (this.props.direction != 'vertical' ? e.clientX : e.clientY);
    this.state.pastMargin = (this.props.direction != 'vertical' ? ReactDOM.findDOMNode(this.refs.carouselContainer).scrollLeft : ReactDOM.findDOMNode(this.refs.carouselContainer).scrollTop);
    documentMouseUp.subscribe(this.unFixPosition);
  }

  unFixPosition(e) {
    this.state.resolution = false;
    documentMouseUp.unsubscribe(this.unFixPosition);
  }

  mouseMove(e) {
    if (this.state.resolution) {
      const indentY = (this.props.direction != 'vertical' ? e.clientX : e.clientY) - this.state.defaultY;
      this.props.direction != 'vertical' ?
        ReactDOM.findDOMNode(this.refs.carouselContainer).scrollLeft = this.state.pastMargin - indentY
        : ReactDOM.findDOMNode(this.refs.carouselContainer).scrollTop = this.state.pastMargin - indentY;
      this.forceUpdate();
    }
  }

  headerClassFormation() {
    return (
      `carousel${this.props.direction ? ` carousel_direction_${this.props.direction}` : ''
      }${this.props.id ? ` carousel_id_${this.props.id}` : ''
      }${this.props.arrows ? ` carousel_arrows_${this.props.arrows}` : ''}`
    );
  }

  render() {
    return (
      <div
        className={this.headerClassFormation()}
        ref="carousel"
        onMouseUp={this.unFixPosition}
      >
        <div className="carousel__stage" ref="stage">
          <div className="carousel__container" ref="carouselContainer">
            <div
              className="carousel__ribbon"
              ref="ribbon"
              onMouseDown={this.fixPosition}
              onMouseMove={this.mouseMove}
            >
              {
                this.props.children
              }
            </div>
          </div>
        </div>
        {
          this.props.arrows ?
            <div>
              <button className="carousel__arrow carousel__arrow_direction_prev" type="button" onMouseDown={this.scrollClick.bind(this, true)} />
              <button className="carousel__arrow carousel__arrow_direction_next" type="button" onMouseDown={this.scrollClick.bind(this, false)} />
            </div>
          : null
        }
      </div>
    );
  }
}
