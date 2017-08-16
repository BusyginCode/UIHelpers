import React, { PropTypes } from 'react';
import classNames from 'classnames';
import indexOfObject from '../../utils/indexOfObject';
import documentClick from '../../utils/documentClick';
import SelectDropDown from '../selectDropDown/selectDropDown';
import './select.scss';

export default class Select extends React.Component {

  static propTypes = {
    close: PropTypes.func,
    open: PropTypes.func,
    checkString: PropTypes.any,
    options: PropTypes.array,
    value: PropTypes.object,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    onChange: PropTypes.func,
    radio: PropTypes.bool,
    visibleRows: PropTypes.number,
  }

  state = {
    isOpen: false,
    findText: ''
  }

  myRefs = {
    select: undefined,
    selectParent: undefined,
  }

  close = () => {
    setTimeout(() => {
      documentClick.unsubscribe(this.close);
      if (this.myRefs.select && this.state.isOpen) {
        if (typeof this.props.close === 'function') {
          this.props.close();
        }
        try {
          this.myRefs.selectParent.blur();
        } catch (err) {
          console.error(err); // eslint-disable-line
        }
        this.setState({
          isOpen: false,
          optionIndex: null
        });
      }
    }, 100);
  }

  selectFocus = () => {
    if (!this.state.isOpen) {
      if (typeof this.props.open === 'function') {
        this.props.open();
      }
      setTimeout(() => { documentClick.subscribe(this.close); }, 100);
      this.setState({
        isOpen: true,
        findText: ''
      });
    }
  }

  selectChange = (e) => {
    if (!this.props.checkString ||
    (typeof this.props.checkString === 'function' && this.props.checkString(e.target.value)) ||
    this.props.checkString.test(e.target.value)) {
      this.setState({
        findText: e.target.value
      });
    }
  }

  checkValue = () => {
    let value;
    let key;

    if (this.state.isOpen) {
      value = this.state.findText;
      key = indexOfObject(this.props.options, 'value', this.props.value);
    } else if (this.props.value === null || this.props.value === undefined) {
      value = this.props.placeholder;
    } else {
      key = indexOfObject(this.props.options, 'value', this.props.value);
      if (key === undefined) {
        value = this.props.placeholder;
      } else {
        value = this.props.options[key].option;
      }
    }

    return { value, key };
  }

  arrowOpen = () => {
    if (!this.state.isOpen) {
      // this.selectFocus()
      this.myRefs.selectParent.focus();
    }
  }

  openFocus = () => {
    if (!this.state.isOpen) {
      if (typeof this.props.open === 'function') {
        this.props.open();
      }
      setTimeout(() => { documentClick.subscribe(this.close); }, 200);
      this.setState({
        isOpen: true,
        findText: ''
      });
    }
  }

  selectKeyDown = (e) => {
    if (e.keyCode === 9 || e.keyCode === 27) {
      this.close();
    }
  }

  render() {
    const value = this.checkValue();
// className={`select${this.state.isOpen && !this.props.disabled ?
// ' select_focus select_active' : this.props.disabled ?
// ' select_disabled' : this.props.error ? ' select_error' : ''}`}
    return (
      <div
        className={classNames('select', {
          'select_focus select_active': this.state.isOpen && !this.props.disabled,
          select_disabled: this.props.disabled,
          select_error: this.props.error,
        })}
        ref={(ref) => { this.myRefs.select = ref; }}
      >
        {
          this.state.isOpen ?
            <div className="select__dropdown">
              <SelectDropDown
                // bottomNode={this.props.bottomNode}
                options={this.props.options}
                isOpen={this.state.isOpen}
                findText={this.state.findText}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
                close={this.close}
                search={false}
                showKey={value.key}
                radio={this.props.radio}
                visibleRows={this.props.visibleRows ? this.props.visibleRows : 5}
              />
            </div>
          : null
        }
        <div className="select__stage">
          <div className="select__stage_icon" onClick={this.arrowOpen} />
          <input
            onKeyDown={this.selectKeyDown}
            // onClick={ this.selectFocus }
            onFocus={this.openFocus}
            className="select__input"
            value={value.value}
            // readOnly={ this.props.readOnly ? "readonly" : '' }
            ref={(ref) => { this.myRefs.selectParent = ref; }}
            onChange={this.selectChange}
            tabIndex={this.props.disabled ? '-1' : ''}
          />
        </div>
      </div>
    );
  }
}
