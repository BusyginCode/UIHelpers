import React, { Component } from 'react';
import CarouselExample from './examples/Carousel';
import CustomScrollExample from './examples/CustomScroll';
import SearchExample from './examples/Search';
import './main.scss';
import './examples/example.scss';

export default class Main extends Component {
  render() {
    return (
      <div>
        <CarouselExample />
        <CustomScrollExample />
        <SearchExample />
      </div>
    );
  }
}
