import React, { Component, PropTypes } from 'react';
import './query.scss';

export default class Query extends Component {

  static propTypes = {
    value: PropTypes.string,
    queryKey: PropTypes.number,
    formEditInput: PropTypes.func,
    deleteQuery: PropTypes.func,
    line: PropTypes.bool,
  }

  componentDidUpdate() {
    this.queryRef.innerText = this.props.value;
  }

  stopPropagation = (e) => {
    e.stopPropagation();
    if (this.props.line) {
      this.props.formEditInput(true);
    } else {
      this.queryRef.parentNode.parentNode.lastChild.focus();
    }
  }

  queryRef = undefined;

  queryEdit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.props.formEditInput(true);
    }
  }

  deleteQuery = (e) => {
    e.stopPropagation();
    this.props.deleteQuery(this.props.queryKey);
  }

  render() {
    return (
      <div
        className="words__tag keyword"
        onClick={this.stopPropagation}
      >
        <div
          ref={(ref) => { this.queryRef = ref; }}
          className="keyword__label"
          onKeyDown={this.queryEdit}
        >
          {this.props.value}
        </div>
        <div
          className="words__delete keyword__delete cancel cancel_size_smallest"
          onClick={this.deleteQuery}
        />
      </div>
    );
  }
}
