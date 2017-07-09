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
          <h3>Line search</h3>
          <div style={{ display: 'flex' }}>
            <Search
              queries={this.state.queries}
              deleteQuery={this.deleteQuery}
              enterQuery={this.addQuery}
              placeholder={'Особые товары'}
              search
              separator=","
              checkString={regexpCheck}
              maxQueryLength={140}
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
          <h3>Search with dropdown</h3>
          <div>
            <Search
              queries={this.state.queries}
              deleteQuery={this.deleteQuery}
              enterQuery={this.addQuery}
              placeholder={'Особые товары'}
              separator=","
              maxQueryLength={140}
              // drop-down props
              line
              blurControl={this.state.blurControl}
              options={this.state.data}
              visibleRows={5}
            />
          </div>
          <h3>Search with rows</h3>
          <div style={{ display: 'flex' }}>
            <Search
              queries={this.state.queries}
              deleteQuery={this.deleteQuery}
              enterQuery={this.addQuery}
              placeholder={'Особые товары'}
              separator=","
              maxQueryLength={140}
            />
          </div>
          <h3>Delete queries by backspace</h3>
          <div style={{ display: 'flex' }}>
            <Search
              queries={this.state.queries}
              deleteQuery={this.deleteQuery}
              enterQuery={this.addQuery}
              placeholder={'Особые товары'}
              separator=","
              maxQueryLength={140}
              line
              search
              blurControl={this.state.blurControl}
              backspaceDeleteQueries
            />
            <button
              className="search__submit button"
            >
              Найти
            </button>
          </div>
          <h3>Max queries length</h3>
          <div style={{ display: 'flex' }}>
            <Search
              queries={this.state.queries}
              deleteQuery={this.deleteQuery}
              enterQuery={this.addQuery}
              placeholder={'Особые товары'}
              separator=","
              maxQueryLength={140}
              maxQueries={5}
              line
              search
            />
            <button
              className="search__submit button"
            >
              Найти
            </button>
          </div>
          <h3>Min query length</h3>
          <div style={{ display: 'flex' }}>
            <Search
              queries={this.state.queries}
              deleteQuery={this.deleteQuery}
              enterQuery={this.addQuery}
              placeholder={'Особые товары'}
              separator=","
              maxQueryLength={140}
              minQueryLength={3}
              line
              search
            />
            <button
              className="search__submit button"
            >
              Найти
            </button>
          </div>
          <h3>Different separator</h3>
          <div style={{ display: 'flex' }}>
            <Search
              queries={this.state.queries}
              deleteQuery={this.deleteQuery}
              enterQuery={this.addQuery}
              placeholder={'Особые товары'}
              separator="."
              maxQueryLength={140}
              line
              search
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
