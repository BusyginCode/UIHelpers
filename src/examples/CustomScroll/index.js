import React, { Component } from 'react';
import CustomScroll from '../../components/CustomScroll';
import { customScrollExampleText } from '../../consts';

export default class CustomScrollExample extends Component {
  render() {
    return (
      <div className="Example">
        <div className="Example__header">
          <h2>CustomScroll</h2>
          <p>
            This component created for customise scroll track.
          </p>
          <p>
            You must wrap your scroll content in to CustomScroll component.
            CustomScroll almost mus have parrent,
            with height(required) and width(not required)
          </p>
          <p>Component has some props:</p>
          <ul>
            <li>
              scrollTrackComponent - React component. Your custom scroll track;
            </li>
            <li>
              scrollTrackClassName - string value.
              Your custom class for customisation default scroll track.
            </li>
          </ul>
        </div>
        <div className="Example__container">
          <h2>Examples:</h2>
          <div style={{ height: '400px' }}>
            <CustomScroll>
              <div>
                {customScrollExampleText}
              </div>
            </CustomScroll>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '400px', height: '400px', marginTop: '20px', display: 'inline-block' }}>
              <CustomScroll
                scrollTrackClassName="CustomScroll__custom-class"
              >
                {customScrollExampleText}
              </CustomScroll>
            </div>
            <div style={{ width: '400px', height: '400px', marginTop: '20px', display: 'inline-block' }}>
              <CustomScroll
                scrollTrackComponent={<div className="CustomScroll__custom-component" />}
              >
                {customScrollExampleText}
              </CustomScroll>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
