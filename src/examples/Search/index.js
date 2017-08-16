import React, { Component } from 'react';
import Search from '../../components/Search';
import './search.scss';

const regexpCheck = string => !/^[<>]*$/.test(string);

export default class SearchExample extends Component {

  state = {
    queries: [],
    blurControl: {},
    data: ['temp1', 'temp2', 'temp3', 'tep4', 'tep5', 'tep6', 'ttt', 'tzz', 'tqq', 'tyy']
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
          <h2>Search input</h2>
          <p>
            This component is input with queries. You can customise it for your demands.
          </p>
          Props:
          <ul>
            <li>queries - array of your queries</li>
            <li>options - array of options, if you use dropdown</li>
            <li>deleteQuery - function which delete query</li>
            <li>enterQuery - function which add query</li>
            <li>placeholder - placeholder for input</li>
            <li>inputTypeSearch - bool, if true input will be type search, else text</li>
            <li>separator - symbol which devide input value, into queries</li>
            <li>stringValidate - function or regexp which validate input</li>
            <li>maxQueryLength - max length of query text</li>
            <li>
              line - if true, input allways will be 1 line, and queries will be
              scrolled left, if false, queries will be drop on next lines
            </li>
            <li>backspaceDeleteQueries - if true, backspace will be delete last query</li>
            <li>maxQueries - max query length</li>
            <li>minQueryLength - min query length</li>
            <li>inputClassName - custom className for input block</li>
            <li>queryClassName - custom className for query</li>
            <li>queryDeleteIconClassName - custom className for delete query button</li>
            <li>dropDownOptionClassName - custom className for drop down option</li>
            <li>dropDownClassName - custom className for dropDown container</li>
          </ul>
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
          <h3>Different separator - .</h3>
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
