import React, { Component, PropTypes } from 'react';
import { documentMouseUp } from '../../utils';
import './carousel.scss';

export default class Carousel extends Component {

  static propTypes = {
    scrollLength: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    elementWidth: PropTypes.number,
    elementHeight: PropTypes.number,
    arrows: PropTypes.bool,
    animationSpeed: PropTypes.number,
  };

  state = {
    animationSpeed: this.props.animationSpeed || 1,
    parentHeight: null,
    childHeight: null,
    resolution: null,
    defaultY: null,
    pastMargin: null
  };

  handlePrevClick = () => this.scrollClick(true)

  handleNextClick = () => this.scrollClick(false)

  scrollClick(path) {
    const nextScroll = this.props.scrollLength * (path ? -1 : 1);
    this.scroll(nextScroll, this.state.animationSpeed * (path ? -1 : 1));
  }

  scroll = (nextScr, animation) => {
    let key = 0;
    let nextScroll = nextScr;
    const nextScrollSave = nextScroll;
    let keyCounter = 0;
    const move = setInterval(() => {
      key += animation;
      keyCounter += key;
      if (this.props.direction === 'vertical') {
        this.carouselContainer.scrollTop += key;
      } else {
        this.carouselContainer.scrollLeft += key;
      }
      nextScroll -= key;
      if ((keyCounter >= nextScrollSave / 2 && key > 0) ||
        (keyCounter <= nextScrollSave / 2 && key < 0)) {
        clearInterval(move);
        const moveSlower = setInterval(() => {
          key -= animation;
          if (this.props.direction === 'vertical') {
            this.carouselContainer.scrollTop += key;
          } else {
            this.carouselContainer.scrollLeft += key;
          }
          nextScroll -= key;
          if (key === 0) {
            clearInterval(moveSlower);
          }
        }, 18);
      }
    }, 18);
  }

  initHeights = () => {
    this.state.parentHeight = (this.props.direction !== 'vertical' ?
      this.carouselContainer.offsetWidth : this.carouselContainer.offsetHeight);
    this.state.childHeight = (this.props.direction !== 'vertical' ?
      this.ribbon.offsetWidth : this.ribbon.offsetHeight);
  }

  fixPosition = (e) => {
    this.initHeights();
    this.state.resolution = true;
    this.state.defaultY = (this.props.direction !== 'vertical' ? e.clientX : e.clientY);
    this.state.pastMargin = (this.props.direction !== 'vertical' ?
      this.carouselContainer.scrollLeft : this.carouselContainer.scrollTop);
    documentMouseUp.subscribe(this.unFixPosition);
  }

  unFixPosition = () => {
    this.state.resolution = false;
    documentMouseUp.unsubscribe(this.unFixPosition);
  }

  mouseMove = (e) => {
    if (this.state.resolution) {
      const indentY = (this.props.direction !== 'vertical' ? e.clientX : e.clientY) - this.state.defaultY;
      if (this.props.direction !== 'vertical') {
        this.carouselContainer.scrollLeft = this.state.pastMargin - indentY;
      } else {
        this.carouselContainer.scrollTop = this.state.pastMargin - indentY;
      }
      this.forceUpdate();
    }
  }

  headerClassFormation = () => (
      `carousel${this.props.direction ? ` carousel_direction_${this.props.direction}` : ''}
       carousel_id_${this.props.direction === 'vertical' ? 'gallery-navigation' : 'tags'}
       carousel_arrows_angles`
    )

  render() {
    const carouselStyle = { width: `${this.props.elementWidth}px`, height: `${this.props.elementHeight}px` };
    const carouselContainerStyle = { width: `${this.props.elementWidth + 15}px` };

    return (
      <div
        className={this.headerClassFormation()}
        ref={ref => (this.carousel = ref)}
        onMouseUp={this.unFixPosition}
      >
        <div
          className="carousel__stage"
          ref={ref => (this.stage = ref)}
          style={carouselStyle}
        >
          <div
            className="carousel__container"
            ref={ref => (this.carouselContainer = ref)}
            style={carouselContainerStyle}
          >
            <div
              className="carousel__ribbon"
              ref={ref => (this.ribbon = ref)}
              onMouseDown={this.fixPosition}
              onMouseMove={this.mouseMove}
            >
              {this.props.children}
            </div>
          </div>
        </div>
        { this.props.arrows &&
          <div className={`carousel__arrows-container-${this.props.direction}`}>
            <button
              className={`carousel__arrow carousel__arrow_direction_prev carousel__arrow_direction_prev-${this.props.direction}`}
              type="button"
              onMouseDown={this.handlePrevClick}
            />
            <button
              className={`carousel__arrow carousel__arrow_direction_next carousel__arrow_direction_next-${this.props.direction}`}
              type="button"
              onMouseDown={this.handleNextClick}
            />
          </div>
        }
      </div>
    );
  }
}
