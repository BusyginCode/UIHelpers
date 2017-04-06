import React, { Component } from 'react';
import Carousel from './components/Carousel';
import './components/Carousel/carousel.scss';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Carousel
          scrollLength={300}
          arrows={'angles'}
          id={'tags'}
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
      </div>
    );
  }
}
