import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Query from './query/query';
import { documentClick, documentKeyDown } from '../../utils';
import './search.scss';

const isIE = !!(window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./));

/*
  TODO
  1) Сделать разными пропсами возможность редактирования по backspace,
  возможность редактирования по нажатию мыши на query,
  2) Улучшить кастомизацию
*/


export default class SearchContainer extends Component {

  static propTypes = {
    queries: PropTypes.array,
    options: PropTypes.array,
    deleteQuery: PropTypes.func,
    enterQuery: PropTypes.func,
    placeholder: PropTypes.string,
    search: PropTypes.bool,
    separators: PropTypes.array,
    checkString: PropTypes.func,
    maxLength: PropTypes.number,
    blurControl: PropTypes.object,
    line: PropTypes.bool,
    visibleRows: PropTypes.number,
  }

  state = {
    active: null,
    wheelCheck: null,
    wordsFocus: null,
    blurBlock: null,
    edit: null,
    text: '',
    wordsClass: null
  }

  componentDidMount() {
    this.wheelCheck();
    if (!this.props.line) {
      this.myRefs.dropDown.style.paddingTop = `${this.myRefs.search.offsetHeight}px`;
    }
  }

  componentWillUpdate() {
    if (this.props.queries.length > 20) {
      this.deleteQuery(this.props.queries.length - 1);
    }
  }

  componentDidUpdate() {
    if (!this.props.line) {
      this.myRefs.dropDown.style.paddingTop = `${this.myRefs.search.offsetHeight}px`;
      if (this.state.text.length === 0) {
        this.state.optionHighlightIndex = 0;
        this.myRefs.wordsList.scrollTop = 0;
      }
    }
  }

  setWordsClassname() {
    const defaultClass = 'search__widget words words_line ';
    if (this.state.wheelCheck && this.state.wordFocus) {
      return `${defaultClass}words_focus words_scrolled `;
    } else if (this.state.wheelCheck) {
      return `${defaultClass}words_scrolled `;
    } else if (this.state.wordFocus) {
      return `${defaultClass}words_focus `;
    }
    return defaultClass;
  }

  setFocus = (div) => {
    div.focus();
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStartAfter(div.lastChild);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  setScroll(sign) {
    this.myRefs.wordsList.scrollTop +=
      (this.refs[this.state.optionHighlightIndex].offsetHeight * (sign ? 1 : -1));
  }

  setOption() {
    this.state.options = [];

    const filteredOptionsLength = this.props.options.filter(
      option => option.toString().toLowerCase().indexOf(this.state.text.toLowerCase()) >= 0
    ).length;

    if (this.state.text && filteredOptionsLength === 0) {
      return <div className="words__option">Ничего не найдено</div>;
    }
    const filteredOptions = this.props.options.filter(option =>
      (!this.state.text || (option.toString().toLowerCase().indexOf(this.state.text) !== -1))
    );
    return filteredOptions.map((option, key) => {
      this.state.options.push(option);
      return (
        <li
          className={`words__option${this.state.optionHighlightIndex === key ? ' words__option_highlight' : ''}`}
          onClick={() => this.optionClick(option)} // eslint-disable-line
          onMouseOver={() => this.mouseOver(key)} // eslint-disable-line
          key={option}
          ref={key}
        >
          { option }
        </li>
      );
    });
  }

  inputChange = (e) => {
    const input = this.myRefs.searchInput;
    this.setState({
      text: e.target.value
    });
    if (this.validCheck(e.target.value)) {
      if (e.target.value.length === 1 &&
        (this.props.separators.indexOf(e.target.value) >= 0 || e.keyCode === 32)
      ) {
        this.setState({ text: '' });
      }
      if (this.props.separators.indexOf(e.target.value[e.target.value.length - 1]) >= 0 &&
        !this.state.edit
      ) {
        this.enter(e.target.value.substr(0, e.target.value.length - 1));
      }
      this.wheelCheck();
    } else {
      this.setState({ text: e.target.value.substr(0, e.target.value.length - 1) });
      input.focus();
    }
  }

  enterPrevDefault = (e) => {
    const input = this.myRefs.searchInput;
    this.setState({
      text: (e.keyCode === 32 && e.target.value.length === 1 ? '' : e.target.value)
    });
    if (e.keyCode === 8 && e.target.value.length === 0 && !this.state.edit) {
      e.preventDefault();
      if (this.props.line) {
        this.formEditInput(false);
      } else if (this.props.queries.length !== 0) {
        this.props.deleteQuery(this.props.queries.length - 1);
      }
    }
    if (e.keyCode === 13) {
      this.state.blurBlock = true;
      e.preventDefault();
      this.setState({
        blurBlock: true
      });
      this.enter(e.target.value, true);
      input.blur();
    }
    if (e.keyCode === 40 || e.keyCode === 38) {
      e.preventDefault();
    }
  }

  formEditInput = (blurBlock) => {
    this.state.blurBlock = blurBlock;
    const input = this.myRefs.searchInput;
    this.setState({
      edit: true,
      text: this.props.queries.join(', ')
    });
    if (this.props.queries.join(', ').length > 0) {
      input.focus();
    }
  }

  enter = (text, needSearch) => {
    const queries = [];
    if (this.props.queries.indexOf(text) < 0 || this.state.edit) {
      if (text.indexOf(',') >= 0 || this.state.edit) {
        text.split(', ').forEach((textQuery) => {
          textQuery.split(',').forEach((query) => {
            if (queries.indexOf(query) < 0 && query.indexOf('<') < 0 && query.indexOf('>') < 0 && query.length > 1) {
              if (query.length < this.props.maxLength) {
                queries.push(query);
              } else {
                queries.push(query.substr(0, this.props.maxLength));
              }
            }
          });
        });
        this.setState({ edit: false });
        this.props.enterQuery(queries, needSearch);
      } else {
        this.setState({ edit: false });
        this.props.enterQuery(text, needSearch);
      }
    }
    this.setState({ text: '' });
  }

  packRender = () =>
    this.props.queries.map((text, key) => (
      <Query
        value={text}
        key={key}
        line={this.props.line}
        queryKey={key}
        formEditInput={this.formEditInput}
        deleteQuery={this.deleteQuery}
      />
    ))

  wheelCheck = () => {
    if (this.myRefs.ribbon.offsetWidth > this.myRefs.words.offsetWidth) {
      this.setState({
        wheelCheck: true
      });
    } else {
      this.setState({
        wheelCheck: false
      });
    }
  }

  focus = () => {
    this.myRefs.searchInput.focus();
  }

  wordBlur = () => {
    if (!this.state.blurBlock || this.state.edit || !this.props.line) {
      if (this.props.blurControl && this.props.blurControl.search) {
        this.enter(this.myRefs.searchInput.value, true);
      }
      this.setState({
        blurBlock: false,
        edit: false
      });
      this.setState({
        text: ''
      });
    }
    this.setState({
      wordFocus: false
    });
    if (!this.props.line) {
      documentClick.unsubscribe(this.wordBlur);
      documentKeyDown.unsubscribe(this.keyControl);
    } else {
      delete this.props.blurControl.search;
      delete this.props.blurControl.focus;
    }
  }

  wordClick = () => {
    this.setState({
      wordFocus: true
    });
  }

  wheel = (e) => {
    if (e.deltaX < 0) {
      this.myRefs.wordsContainer.scrollLeft -= 100;
    }
  }

  inputFocus = () => {
    if (!this.props.line) {
      documentKeyDown.subscribe(this.keyControl);
      setTimeout(() => { documentClick.subscribe(this.wordBlur); }, 200);
    } else {
      this.props.blurControl.focus = true;
    }
  }

  deleteQuery = (key, e) => {
    if (e) {
      e.stopPropagation();
    }
    this.props.deleteQuery(key);
  };

    /*
  * Dropdown type functions
  */


  optionClick = (option) => {
    this.props.enterQuery(option);
    this.setState({
      text: '',
      optionHighlightIndex: 0
    });
  }

  mouseOver = (key) => {
    this.setState({
      optionHighlightIndex: key
    });
  }

  keyControl = (e) => {
    const optionIndexBlock = ReactDOM.findDOMNode(this.refs[this.state.optionHighlightIndex]); // eslint-disable-line
    if (e.keyCode === 13 && this.state.options.length > 0) {
      this.optionClick(this.state.options[this.state.optionHighlightIndex]);
    }

    if (e.keyCode === 40 && (this.state.optionHighlightIndex < this.state.options.length - 1)) {
      this.setState({
        optionHighlightIndex: this.state.optionHighlightIndex + 1
      }, () => {
        if (((optionIndexBlock.offsetTop - 20) - this.myRefs.wordsList.scrollTop) >
          (28 * this.props.visibleRows) + 10
        ) {
          this.setScroll(true);
        }
      });
    }
    if (e.keyCode === 38 && this.state.optionHighlightIndex > 0) {
      this.setState({
        optionHighlightIndex: this.state.optionHighlightIndex - 1
      }, () => {
        if (this.state.optionHighlightIndex >= 0 &&
          (optionIndexBlock.offsetTop - 26) < this.myRefs.wordsList.scrollTop
        ) {
          this.setScroll(false);
        }
      });
    }
  };

  validCheck = (text) => {
    if (!this.props.checkString ||
      (typeof this.props.checkString === 'function' && this.props.checkString(text)) ||
      (typeof this.props.checkString !== 'function' && this.props.checkString.test(text))
    ) {
      return true;
    }
    return false;
  }

  myRefs = {
    words: undefined,
    search: undefined,
    wordsContainer: undefined,
    ribbon: undefined,
    searchInput: undefined,
    dropDown: undefined,
    wordsList: undefined,
  }

  headClassFormation() {
    return (
      `search__widget words${this.state.wordFocus ? ' words_focus ' : ''}${this.state.text.length > 0 ? ' words_active' : ''}`
    );
  }

  render() {
    const placeholder = this.props.queries.length === 0 && !isIE
      ? this.props.placeholder
      : null;

    return (
      <div
        className={(this.props.line ? this.setWordsClassname() : this.headClassFormation())}
        ref={(ref) => { this.myRefs.words = ref; }}
        onMouseDown={this.wordClick}
        onBlur={(this.props.line ? this.wordBlur : null)}
      >
        { !this.props.line &&
        <div
          className="words__dropdown"
          ref={(ref) => { this.myRefs.dropDown = ref; }}
        >
          <ul
            className="words__list"
            ref={(ref) => { this.myRefs.wordsList = ref; }}
          >
            {this.setOption()}
          </ul>
        </div>
        }
        <div
          className={`words__stage${this.props.line ? ' search__input' : ''}`}
          ref={(ref) => { this.myRefs.search = ref; }}
          id="search"
        >
          <div
            className="words__container"
            ref={(ref) => { this.myRefs.wordsContainer = ref; }}
            id="words__container"
            onWheel={this.wheel}
          >
            <div
              className="words__ribbon"
              ref={(ref) => { this.myRefs.ribbon = ref; }}
            >
              {Boolean(!this.state.edit) && this.packRender()}
              <input
                value={this.state.text}
                tabIndex="-1"
                className="words__input"
                maxLength={this.state.edit ? Infinity : this.props.maxLength}
                placeholder={placeholder}
                type={this.props.search ? 'search' : 'text'}
                ref={(ref) => { this.myRefs.searchInput = ref; }}
                onChange={this.inputChange}
                onKeyDown={this.enterPrevDefault}
                onFocus={this.inputFocus}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

