import React, { Component, PropTypes } from 'react';
import { documentMouseUp } from '../../utils';
import './carousel.scss';

/*
  Для вертикального режима необходимо отсутствие arrows, id="gallery-navigation",
  direction="vertical" а также высота и ширина родителя.
  Также у детей должно быть overflow: hidden и конкретная ширина,
  ширину надо смочь прокидывать пропсом.

  Горизонтально нужно  direction="horizontal" и id="tags" и arrows,
  можно добавить возможность подключать свой css со своими кнопками детьми и т.д.
  Полная кастомизация.

  Для горизонтального скролла нужно зажать шифт.
*/

export default class Carousel extends Component {

  static propTypes = {
    scrollLength: PropTypes.number,
    direction: PropTypes.string,
    id: PropTypes.string,
    arrows: PropTypes.string,
    children: PropTypes.any,
  };

  state = {
    animationSpeed: 1,
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
      this.carouselContainer.scrollLeft += key;
      nextScroll -= key;
      if ((keyCounter >= nextScrollSave / 2 && key > 0) ||
        (keyCounter <= nextScrollSave / 2 && key < 0)) {
        clearInterval(move);
        const moveSlower = setInterval(() => {
          key -= animation;
          this.carouselContainer.scrollLeft += key;
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
      ${this.props.id ? ` carousel_id_${this.props.id}` : ''}
      ${this.props.arrows ? ` carousel_arrows_${this.props.arrows}` : ''}`
    )

  render() {
    return (
      <div
        className={this.headerClassFormation()}
        ref={ref => (this.carousel = ref)}
        onMouseUp={this.unFixPosition}
      >
        <div className="carousel__stage" ref={ref => (this.stage = ref)}>
          <div className="carousel__container" ref={ref => (this.carouselContainer = ref)}>
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
          <div>
            <button
              className="carousel__arrow carousel__arrow_direction_prev"
              type="button"
              onMouseDown={this.handlePrevClick}
            />
            <button
              className="carousel__arrow carousel__arrow_direction_next"
              type="button"
              onMouseDown={this.handleNextClick}
            />
          </div>
        }
      </div>
    );
  }
}
