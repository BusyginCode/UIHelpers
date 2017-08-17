import React, { Component } from 'react';
import Slider from '../../components/Slider';
import './slider.scss';

export default class SliderExample extends Component {
  render() {
    return (
      <div className="Example">
        <div className="Example__header">
          <h2>Slider</h2>
          <p>
            Simple component for mouse scrolling any list of blocks.
            Parent of this component must have height, and overflow hidden.
          </p>
          Props:
          <ul>
            <li>scrollStep - mouse wheel speed</li>
          </ul>
        </div>
        <div className="Example__container">
          <h2>Examples:</h2>
          <div className="SliderParent">
            <Slider scrollStep={50}>
              <div className="SliderChild">1</div>
              <div className="SliderChild">2</div>
              <div className="SliderChild">3</div>
              <div className="SliderChild">4</div>
              <div className="SliderChild">5</div>
              <div className="SliderChild">6</div>
              <div className="SliderChild">7</div>
              <div className="SliderChild">8</div>
              <div className="SliderChild">9</div>
              <div className="SliderChild">10</div>
              <div className="SliderChild">11</div>
              <div className="SliderChild">12</div>
              <div className="SliderChild">13</div>
              <div className="SliderChild">14</div>
              <div className="SliderChild">15</div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
