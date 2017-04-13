import React, { Component } from 'react';
import Carousel from './components/Carousel';
import './main.scss';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Carousel
          scrollLength={300}
          direction="horizontal" // horizontal | vertical
          id="tags"
          arrows="angles"
        >
          <button className="carousel__item alias" type="button">зеленый</button>
          <button className="carousel__item alias" type="button">шарф</button>
          <button className="carousel__item alias" type="button">пальто</button>
          <button className="carousel__item alias" type="button">кардиган</button>
          <button className="carousel__item alias" type="button">бриджи</button>
          <button className="carousel__item alias" type="button">шампанское</button>
          <button className="carousel__item alias" type="button">зеленый</button>
          <button className="carousel__item alias" type="button">шарф</button>
          <button className="carousel__item alias" type="button">пальто</button>
          <button className="carousel__item alias" type="button">кардиган</button>
          <button className="carousel__item alias" type="button">бриджи</button>
          <button className="carousel__item alias" type="button">шампанское</button>
          <button className="carousel__item alias" type="button">зеленый</button>
          <button className="carousel__item alias" type="button">шарф</button>
          <button className="carousel__item alias" type="button">пальто</button>
          <button className="carousel__item alias" type="button">кардиган</button>
          <button className="carousel__item alias" type="button">бриджи</button>
          <button className="carousel__item alias" type="button">шампанское</button>
          <button className="carousel__item alias" type="button">зеленый</button>
          <button className="carousel__item alias" type="button">шарф</button>
          <button className="carousel__item alias" type="button">пальто</button>
          <button className="carousel__item alias" type="button">кардиган</button>
          <button className="carousel__item alias" type="button">бриджи</button>
          <button className="carousel__item alias" type="button">шампанское</button>
        </Carousel>
        <div style={{ width: '200px', height: '300px', marginTop: '50px' }}>
          <Carousel
            scrollLength={300}
            direction="vertical" // horizontal | vertical
            id="gallery-navigation"
          >
            <button className="carousel__item alias custom-width" type="button">I</button>
            <button className="carousel__item alias custom-width" type="button">@</button>
            <button className="carousel__item alias custom-width" type="button">JS</button>
            <button className="carousel__item alias custom-width" type="button">Are</button>
            <button className="carousel__item alias custom-width" type="button">You</button>
            <button className="carousel__item alias custom-width" type="button">?</button>
            <button className="carousel__item alias custom-width" type="button">!</button>
            <button className="carousel__item alias custom-width" type="button">!</button>
            <button className="carousel__item alias custom-width" type="button">!</button>
            <button className="carousel__item alias custom-width" type="button">!</button>
            <button className="carousel__item alias custom-width" type="button">jsx</button>
            <button className="carousel__item alias custom-width" type="button">es6</button>
            <button className="carousel__item alias custom-width" type="button">spa</button>
            <button className="carousel__item alias custom-width" type="button">C</button>
            <button className="carousel__item alias custom-width" type="button">o</button>
            <button className="carousel__item alias custom-width" type="button">o</button>
            <button className="carousel__item alias custom-width" type="button">o</button>
            <button className="carousel__item alias custom-width" type="button">l</button>
            <button className="carousel__item alias custom-width" type="button">!</button>
            <button className="carousel__item alias custom-width" type="button">!</button>
            <button className="carousel__item alias custom-width" type="button">!</button>
            <button className="carousel__item alias custom-width" type="button">Tnx</button>
            <button className="carousel__item alias custom-width" type="button">By</button>
          </Carousel>
        </div>
      </div>
    );
  }
}
