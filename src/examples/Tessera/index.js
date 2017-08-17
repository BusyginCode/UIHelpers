import React, { Component } from 'react';
import Tessera from './components/Tessera';

export default class TesseraExample extends Component {
  render() {
    return (
      <div className="Example">
        <div className="Example__header">
          <h2>Tessera</h2>
          <p></p>
          <ul>
            <li></li>
          </ul>
        </div>
        <div className="Example__container">
          <h2>Examples:</h2>
          <Tessera />
        </div>
      </div>
    );
  }
}
