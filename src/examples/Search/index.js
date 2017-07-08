import React, { Component } from 'react';
import Search from '../../components/Search';
import './search.scss';

const regexpCheck = string => !/^[<>]*$/.test(string);

export default class SearchExample extends Component {

  state = {
    queries: [],
    blurControl: {},
    data: ['temp1', 'temp2', 'temp3', 'tep4', 'tep5', 'tep6']
  }

  deleteQuery = (index) => {
    this.state.queries.splice(index, 1);
    this.setState({ queries: this.state.queries });
  }

  addQuery = (text, needSearch) => {
    if (typeof text === 'string') {
      if (text.length > 0) {
        this.state.queries.push(text);
      }
    } else {
      this.state.queries = text;
    }
    this.setState({
      queries: this.state.queries
    }, () => {
      if (needSearch) {
        // do some things
      }
    });
  };


  render() {
    return (
      <div className="Example">
        <div className="Example__header">
          <h2>Search</h2>
        </div>
        <div className="Example__container">
          <h2>Examples:</h2>
          <div style={{ display: 'flex' }}>
            <Search
              queries={this.state.queries}
              deleteQuery={this.deleteQuery}
              enterQuery={this.addQuery}
              placeholder={'Особые товары'}
              search
              separators={[',']}
              checkString={regexpCheck}
              maxLength={140}
              // line props
              line
              blurControl={this.state.blurControl}
            />
            <button
              className="search__submit button"
            >
              Найти
            </button>
          </div>
          <div style={{ marginTop: '100px', display: 'flex' }}>
            <Search
              options={this.state.data}
              deleteQuery={this.deleteQuery}
              enterQuery={this.addQuery}
              placeholder={'Особые товары'}
              separators={[',']}
              maxLength={140}
              // drop-down props
              queries={this.state.queries}
              visibleRows={5}
              maxQueries={5}
            />
            <button
              className="search__submit button"
            >
              Найти
            </button>
          </div>
        </div>
      </div>
    );
  }
}
