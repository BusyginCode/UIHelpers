import React, { Component } from 'react';
import Carousel from '../../components/Carousel';
import './carousel.scss';

export default class CarouselExample extends Component {
  render() {
    return (
      <div>
        <h2>Carousel</h2>
        <p>
          This component created for easy scrolling list of buttons,
          or tags that will be it children.
        </p>
        <p>Width of component equal it parent.</p>
        <p>You can use default styles of component if you will use component as in the example.</p>
        <p>Component has some props:</p>
        <ul>
          <li>
            scrollLength - int value equal to the number to which the
            scroll will be produced by a single click on the button;
          </li>
          <li>
            direction - string value. Can be horizontal or vertical.
            Indicates that panel will be horizontal or vertical;
          </li>
          <li>
            arrows - bool value.
            Indicates has component scroll buttons or not;
          </li>
          <li>
            animationSpeed - int value.
            Indicate speed of scroll;
          </li>
          <li>
            elementWidth - int value. Required if direction is vertical.
            Indicate width of component, and must be equal with it children width;
          </li>
          <li>
            elementHeight - int value. Required if direction is horisontal.
            Indicate height of component, and must be equal with it children height.
          </li>
        </ul>
        <h3>Examples:</h3>
        <Carousel
          scrollLength={300}
          elementHeight={30}
          direction="horizontal" // horizontal | vertical
          arrows
          animationSpeed={1}
        >
          <button className="carousel__item">Green</button>
          <button className="carousel__item">Yellow</button>
          <button className="carousel__item">Body</button>
          <button className="carousel__item">Color</button>
          <button className="carousel__item">Money</button>
          <button className="carousel__item">Buy</button>
          <button className="carousel__item">Some</button>
          <button className="carousel__item">Text</button>
          <button className="carousel__item">Here</button>
          <button className="carousel__item">Come</button>
          <button className="carousel__item">On</button>
          <button className="carousel__item">Use</button>
          <button className="carousel__item">Me</button>
          <button className="carousel__item">And</button>
          <button className="carousel__item">You</button>
          <button className="carousel__item">Be</button>
          <button className="carousel__item">Happy</button>
          <button className="carousel__item">Hello</button>
          <button className="carousel__item">I</button>
          <button className="carousel__item">Am</button>
          <button className="carousel__item">Carousel</button>
          <button className="carousel__item">And</button>
          <button className="carousel__item">You</button>
          <button className="carousel__item">Awesome</button>
        </Carousel>
        <div style={{ width: '200px', height: '300px', marginTop: '20px' }}>
          <Carousel
            elementWidth={40}
            scrollLength={100}
            direction="vertical" // horizontal | vertical
            arrows
          >
            <button className="carousel__item custom-width">I</button>
            <button className="carousel__item custom-width">@</button>
            <button className="carousel__item custom-width">JS</button>
            <button className="carousel__item custom-width">Are</button>
            <button className="carousel__item custom-width">You</button>
            <button className="carousel__item custom-width">?</button>
            <button className="carousel__item custom-width">!</button>
            <button className="carousel__item custom-width">!</button>
            <button className="carousel__item custom-width">!</button>
            <button className="carousel__item custom-width">!</button>
            <button className="carousel__item custom-width">jsx</button>
            <button className="carousel__item custom-width">es6</button>
            <button className="carousel__item custom-width">spa</button>
            <button className="carousel__item custom-width">C</button>
            <button className="carousel__item custom-width">o</button>
            <button className="carousel__item custom-width">o</button>
            <button className="carousel__item custom-width">o</button>
            <button className="carousel__item custom-width">l</button>
            <button className="carousel__item custom-width">!</button>
            <button className="carousel__item custom-width">!</button>
            <button className="carousel__item custom-width">!</button>
            <button className="carousel__item custom-width">Tnx</button>
            <button className="carousel__item custom-width">By</button>
          </Carousel>
        </div>
      </div>
    );
  }
}
