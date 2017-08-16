import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import documentKeyDown from '../../utils/documentKeyDown';

export default class SelectDropDown extends React.Component {

  static propTypes = {
    showKey: PropTypes.number,
    search: PropTypes.bool,
    findText: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    close: PropTypes.func,
    isOpen: PropTypes.bool,
    visibleRows: PropTypes.number,
    placeholder: PropTypes.string,
    radio: PropTypes.bool,
  }

  state = {
    optionIndex: 0,
    optionsMap: null,
    class: "select__option"
  }

  /*
  *
  * componentDidMount, componentWillUnmount ==> subscribe and unsubscribe onKeyDown
  *
  */

  componentDidMount() {
    documentKeyDown.subscribe(this.keyControl);
  }

  componentWillUnmount() {
    documentKeyDown.unsubscribe(this.keyControl);
  }

  /*
  *
  * setScroll ==> function add and sub. scroll
  *
  */

  setScroll(sign) {
    this.selectOptionsRef.scrollTop += (ReactDOM.findDOMNode(this.refs[`rS${this.state.optionIndex}`]).offsetHeight * (sign ? 1 : -1)); // eslint-disable-line
  }

  /*
  *
  * optionsTextFiltr ==> function filtr need values from options
  */

  optionsTextFiltr() {
    this.state.optionIndex = this.state.optionsMap[this.state.optionIndex];
    this.props.onChange(this.props.options[this.state.optionIndex].value);
  }

  /*
  *
  * keyControl ==> function onKeyDown subscribe on document, scroll, close, enter list
  *
  */

  keyControl = (e) => {
    if (this.props.isOpen) {
      if (e.keyCode === 13) {
        if ((this.state.optionIndex === 0 || !this.state.optionIndex) &&
          (!this.props.findText || this.state.optionsMap.length === 0)
        ) {
          this.props.onChange(null);
        } else if (this.props.findText) {
          this.optionsTextFiltr();
        } else {
          this.props.onChange(this.props.options[this.state.optionIndex - 1].value);
        }
      }

      if ((e.keyCode === 27 || e.keyCode === 13)) {
        this.props.close();
      }

      if (e.keyCode === 40 &&
        (this.state.optionIndex <
          (this.state.optionsMap ? this.state.optionsMap.length - 1 : this.props.options.length - 1)
        )
      ) {
        this.setState({
          optionIndex: this.state.optionIndex + 1
        }, () => {
          if ((ReactDOM.findDOMNode(this.refs[`rS${this.state.optionIndex}`]).offsetTop - 26) -  // eslint-disable-line
            this.selectOptionsRef.scrollTop > (28 * this.props.visibleRows) + 10
          ) {
            this.setScroll(true);
          }
        });
      }
      if (e.keyCode === 38 && e.keyCode >= 0 && this.state.optionIndex > 0) {
        this.setState({
          optionIndex: this.state.optionIndex - 1
        }, () => {
          if (this.state.optionIndex >= 0 &&
            (ReactDOM.findDOMNode(this.refs[`rS${this.state.optionIndex}`]).offsetTop - 26) < this.selectOptionsRef.scrollTop // eslint-disable-line
          ) {
            this.setScroll(false);
          }
        });
      }
    }
  };

  /*
  *
  * optionClick ==> function onMouseDown on li
  *
  */

  optionClick(index) {
    // this.state.optionIndex = 0
    if (index - 1 !== this.props.showKey) {
      if (index === 0 && !this.props.search && !this.props.findText) {
        this.props.onChange(null);
      } else if (this.props.search) {
        this.props.onChange(index);
      } else if (this.props.findText) {
        this.optionsTextFiltr();
      } else {
        this.props.onChange(this.props.options[index - 1].value);
      }
    }
    this.props.close();
  }

  selectOptionsRef = undefined;

  /*
  *
  * mouseOver ==> onMouseOver on li
  *
  */

  mouseOver(index) {
    this.setState({ optionIndex: index });
  }

  /*
  *
  * setOptions ==> transform json into li
  *
  */

  // className={(this.props.options[key].disabled ?
  //   "select__option select__option_default" :
  //   (needKey === this.state.optionIndex && this.props.showKey === key ?
  //     "select__option select__option_selected select__option_highlight" :
  //     needKey === this.state.optionIndex ?
  //       "select__option select__option_highlight" :
  //       this.props.showKey === key ?
  //         "select__option select__option_selected" :
  //         this.state.class)
  // )}

  // className={(
  //   this.props.options[key].disabled ?
  //     "select__option select__option_default" :
  //     (key + 1 === this.state.optionIndex && this.props.showKey === key ?
  //       "select__option select__option_selected select__option_highlight" :
  //       key + 1 === this.state.optionIndex ?
  //         "select__option select__option_highlight" :
  //         this.props.showKey === key ?
  //           "select__option select__option_selected" :
  //           this.state.class)
  // )}

  renderOption = (key, ref, needKey, keyProp, option) =>
    <li
      key={keyProp}
      ref={ref}
      className={classNames('select__option', {
        select__option_default: this.props.options[key].disabled,
        'select__option_selected select__option_highlight': needKey === this.state.optionIndex && this.props.showKey === key,
        select__option_highlight: needKey === this.state.optionIndex,
        select__option_selected: this.props.showKey === key
      })}
      onMouseDown={(!this.props.options[key].disabled ? () => this.optionClick(needKey) : null)}
      onMouseOver={() => this.mouseOver(needKey)} // eslint-disable-line
    >
      { option.option ? option.option : option.showOption }
    </li>


  renderOptions() {
    let options = [];
    let needKey = 0;
    this.state.optionsMap = [];
    this.props.options.forEach((option, key) => {
      if (this.props.findText) {
        if ((option.showOption ? option.showOption : option.option)
          .toLowerCase().indexOf(this.props.findText.toLowerCase()) !== -1
        ) {
          this.state.optionsMap[needKey] = key;
          options.push(this.renderOption(key, `rS${needKey}`, needKey, key, option));
          needKey += 1;
        }
      } else {
        this.state.optionsMap = null;
        options.push(this.renderOption(key, `rS${key + 1}`, key + 1, key + 1, option));
      }
    });

    if (this.props.findText !== '' && options.length === 0) {
      options = (
        <li
          className={this.state.optionIndex === 0 ? "select__option select__option_highlight" : this.state.class}
          key={0}
          ref={'rS0'}
          onMouseOver={() => this.mouseOver(0)} // eslint-disable-line
        >
          Не найдено
        </li>
      );
    } else if (this.props.findText === '' && !this.props.search && !this.props.radio) {
      options.unshift(
        <li
          className={this.state.optionIndex === 0 ? "select__option select__option_highlight" : this.state.class}
          key={0}
          ref={'rS0'}
          onMouseDown={() => this.optionClick(0)} // eslint-disable-line
          onMouseOver={() => this.mouseOver(0)} // eslint-disable-line
        >
          { this.props.placeholder }
        </li>
        );
    }
    if (this.state.optionsMap && this.state.optionIndex > this.state.optionsMap.length - 1) {
      this.state.optionIndex = 0;
    }
    return options;
  }

  render() {
    return (
      <ul
        className="select__list"
        id="option_container"
        ref={(ref) => { this.selectOptionsRef = ref; }}
        style={{ overflow: 'auto', maxHeight: `${(28 * (this.props.visibleRows || 5)) + 10}px` }}
      >
        {this.renderOptions()}
      </ul>
    );
  }
}
