import { indexOfObject, keyDownAction, documentClick, clickInBlock } from 'newUtils'
import SelectDropDown from '../selectDropDown/selectDropDown'

export default class Select extends React.Component {

  constructor(props) {
    super()
    this.state = {
      isOpen: false,
      findText: ''
    }
    this.close = this.close.bind(this)
    this.selectFocus = this.selectFocus.bind(this)
    this.selectChange = this.selectChange.bind(this)
    this.arrowOpen = this.arrowOpen.bind(this)
    this.openFocus = this.openFocus.bind(this)
  }

  close(e) {
    setTimeout(() => {
      documentClick.unsubscribe(this.close)
      if (ReactDOM.findDOMNode(this.refs.select) && this.state.isOpen) {
        if (typeof this.props.close === 'function') {
          this.props.close()
        }
        try {
          ReactDOM.findDOMNode(this.refs.selectParent).blur()
        } catch (e) {}
        this.setState({
          isOpen: false,
          optionIndex: null
        })
      }
    }, 100)
  }

  selectFocus() {
    if (!this.state.isOpen) {
      if (typeof this.props.open === 'function') {
        this.props.open()
      }
      setTimeout(()=>{documentClick.subscribe(this.close)}, 100)
      this.setState({
        isOpen: true,
        findText: ''
      })
    }
  }

  selectChange(e) {
    if (!this.props.checkString ||
    (typeof this.props.checkString === 'function' && this.props.checkString(e.target.value)) ||
    this.props.checkString.test(e.target.value)) {
      this.setState({
        findText: e.target.value
      })
    }
  }

  checkValue() {
    let value, key

    if (this.state.isOpen) {
      value = this.state.findText
      key = indexOfObject(this.props.options, 'value', this.props.value)
    } else if (this.props.value === null || this.props.value === undefined) {
      value = this.props.placeholder
    } else {
      key = indexOfObject(this.props.options, 'value', this.props.value)
      if (key === undefined) {
        value = this.props.placeholder
      } else {
        value = this.props.options[key].option
      } 
    }

    return {
      value,
      key
    }

  }

  arrowOpen() {
    if (!this.state.isOpen) {
      //this.selectFocus()
      ReactDOM.findDOMNode(this.refs.selectParent).focus()
    }
  }

  openFocus(e) {
    if (!this.state.isOpen) {
      if (typeof this.props.open === 'function') {
        this.props.open()
      }
      setTimeout(()=>{documentClick.subscribe(this.close)}, 200)
      this.setState({
        isOpen: true,
        findText: ''
      })
    }
  }

  selectKeyDown(e) {
    if (e.keyCode == 9 || e.keyCode == 27) {
      this.close()
    }
  }

  render() {

    let value = this.checkValue()
    
    return (
      <div
        className={ 'select' + (this.state.isOpen && !this.props.disabled ? ' select_focus select_active' : this.props.disabled ? ' select_disabled' : this.props.error ? ' select_error' : '') }
        ref="select"
      >
        {
          this.state.isOpen ?
            <div className="select__dropdown">
              <SelectDropDown
                bottomNode={ this.props.bottomNode }
                options={ this.props.options }
                isOpen={ this.state.isOpen }
                findText={ this.state.findText }
                onChange={ this.props.onChange }
                placeholder={ this.props.placeholder }
                close={ this.close.bind(this) }
                search={ false }
                showKey={ value.key }
                radio={ this.props.radio }
                visibleRows={ this.props.visibleRows ? this.props.visibleRows : 5 }
              />
            </div>
          : null
        }
        <div className="select__stage">
          <div className="select__stage_icon" onClick={ this.arrowOpen }></div>
          <input
            onKeyDown={ this.selectKeyDown.bind(this) }
            //onClick={ this.selectFocus }
            onFocus={ this.openFocus }
            className="select__input"
            value={ value.value }
            // readOnly={ this.props.readOnly ? "readonly" : '' }
            ref="selectParent"
            onChange={ this.selectChange }
            tabIndex={ this.props.disabled ? '-1' : '' }
            />
        </div>
      </div>
    )

  }
}

