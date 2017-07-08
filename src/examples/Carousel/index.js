import React, { Component } from 'react';
import Carousel from '../../components/Carousel';
import './carousel.scss';

const examplesH = ['Green', 'Yellow', 'Body', 'Color', 'Money', 'Buy', 'Some', 'Text', 'Here', 'Come', 'On', 'Use', 'Me', 'And', 'You', 'Be', 'Happy'];

const lastExamplesH = [...examplesH, ...examplesH];

const examplesV = ['I', '@', 'JS', 'Are', 'You', '?', '!', '!', '!', '!', 'jsx', 'es', 'spa', 'C', 'o', 'o'];

const lastExamplesV = [...examplesV, ...examplesV];

export default class CarouselExample extends Component {
  render() {
    return (
      <div className="Example">
        <div className="Example__header">
          <h2>Carousel</h2>
          <p>
            This component created for easy scrolling list of buttons,
            or tags that will be it children.
          </p>
          <p>
            You can scroll by clicking on scroll arrows, drag tags,
            scroll with mouse wheel(on horisontal, you must enter shift button)
          </p>
          <p>Width of component equal it parent.</p>
          <p>
            You can use default styles of component
            if you will use component as in the example.
          </p>
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
            <li>
              prevButtonClassName/nextButtonClassName - string value.
              class names for customisation scroll buttons
            </li>
          </ul>
        </div>
        <div className="Example__container">
          <h2>Examples:</h2>
          <Carousel
            scrollLength={300}
            elementHeight={30}
            direction="horizontal"
            arrows
            animationSpeed={1}
          >
            {lastExamplesH.map(item => <button className="carousel__item" key={Math.random()}>{item}</button>)}
          </Carousel>
          <div style={{ width: '200px', height: '300px', marginTop: '20px', display: 'inline-block', }}>
            <Carousel
              elementWidth={100}
              scrollLength={100}
              direction="vertical"
              arrows
            >
              {lastExamplesV.map(item =>
                <button style={{ width: '100px' }} className="carousel__item custom-width" key={Math.random()}>{item}</button>
              )}
            </Carousel>
          </div>
          <div style={{ width: '200px', height: '300px', marginTop: '20px', display: 'inline-block', }}>
            <Carousel
              elementWidth={40}
              scrollLength={100}
              direction="vertical"
              arrows
              prevButtonClassName="Custom__arrow-prev"
              nextButtonClassName="Custom__arrow-next"
            >
              {lastExamplesV.map(item =>
                <button className="carousel__item custom-width" key={Math.random()}>{item}</button>
              )}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}
