import { documentKeyDown } from 'newUtils'

export default class SelectDropDown extends React.Component {

  constructor() {
    super()
    this.state = {
      optionIndex: 0,
      optionsMap: null,
      class: "select__option"
    }
  }

  /*
  *
  * optionClick ==> function onMouseDown on li
  *
  */

  optionClick(index, e) {
    //this.state.optionIndex = 0
    if (index - 1 !== this.props.showKey) {
      if (index == 0 && !this.props.search && !this.props.findText) {
        this.props.onChange(null)
      } else {
        if (this.props.search) {
          this.props.onChange(index)
        } else {
          if (this.props.findText) {
            this.optionsTextFiltr()
          } else {
            this.props.onChange(this.props.options[index - 1].value)
          }
        }
      }
    } 
    this.props.close()
  }

  /*
  *
  * optionsTextFiltr ==> function filtr need values from options 
  */

  optionsTextFiltr() {
    this.state.optionIndex = this.state.optionsMap[this.state.optionIndex]
    this.props.onChange(this.props.options[this.state.optionIndex].value)
  }

  /*
  *
  * keyControl ==> function onKeyDown subscribe on document, scroll, close, enter list 
  *
  */

  keyControl = (e) => {

    if (this.props.isOpen) {
      if (e.keyCode == 13) {
        if ((this.state.optionIndex === 0 || !this.state.optionIndex) && (!this.props.findText || this.state.optionsMap.length == 0)) {       
          this.props.onChange(null)
        } else {
          if (this.props.findText) {
            this.optionsTextFiltr()
          } else {
            this.props.onChange(this.props.options[this.state.optionIndex - 1].value)
          }
        } 
      }  

      if ((e.keyCode == 27 || e.keyCode == 13)) {
        this.props.close()
      }

      if (e.keyCode == 40 && (this.state.optionIndex < (this.state.optionsMap ? this.state.optionsMap.length - 1 : this.props.options.length - 1))) {
        this.setState({
          optionIndex: this.state.optionIndex + 1
        }, () => {
          if ((ReactDOM.findDOMNode(this.refs['rS' + this.state.optionIndex]).offsetTop - 26) - ReactDOM.findDOMNode(this.refs.selectOptions).scrollTop > 28 * this.props.visibleRows + 10) {
            this.setScroll(true)
          }
        })
      } 
      if (e.keyCode == 38 && e.keyCode >= 0 && this.state.optionIndex > 0) {
        this.setState({
          optionIndex: this.state.optionIndex - 1
        }, () => {
          if (this.state.optionIndex >= 0 && (ReactDOM.findDOMNode(this.refs['rS' + this.state.optionIndex]).offsetTop - 26) < ReactDOM.findDOMNode(this.refs.selectOptions).scrollTop) {
            this.setScroll(false)
          }
        })
      }
    }
  };

  /*
  *
  * setScroll ==> function add and sub. scroll
  *
  */

  setScroll(sign) {
    ReactDOM.findDOMNode(this.refs.selectOptions).scrollTop += (ReactDOM.findDOMNode(this.refs['rS' + this.state.optionIndex]).offsetHeight * (sign ? 1 : -1))
  }

  /*
  *
  * componentDidMount, componentWillUnmount ==> subscribe and unsubscribe onKeyDown
  *
  */

  componentDidMount() {
    documentKeyDown.subscribe(this.keyControl)
  }

  componentWillUnmount() {
    documentKeyDown.unsubscribe(this.keyControl)
  }

  /*
  *
  * mouseOver ==> onMouseOver on li
  *
  */

  mouseOver(index, e) {
    this.setState({
      optionIndex: index
    })
  }

  /*
  *
  * setOptions ==> transform json into li
  *
  */

  setOptions() {

    let options = [],
      needKey = 0
    this.state.optionsMap = []
    for (let key = 0; key <= this.props.options.length - 1; key++) {
      let option = this.props.options[key]
      if (this.props.findText) {
        if ((option.showOption ? option.showOption : option.option).toLowerCase().indexOf(this.props.findText.toLowerCase()) !== -1) {
          this.state.optionsMap[needKey] = key
          options.push (
            <li 
              key={ key } 
              ref={ 'rS' + needKey }
              className={ (this.props.options[key].disabled ? "select__option select__option_default" : (needKey === this.state.optionIndex && this.props.showKey === key ? "select__option select__option_selected select__option_highlight" : needKey === this.state.optionIndex ? "select__option select__option_highlight" : this.props.showKey === key ? "select__option select__option_selected" :  this.state.class))  }
              onMouseDown={ (!this.props.options[key].disabled ? this.optionClick.bind(this, needKey) : null) } 
              onMouseOver={ this.mouseOver.bind(this, needKey) } >
              { option.option ? option.option : option.showOption } 
            </li>
          )
          ++needKey
        }
      } else {
        this.state.optionsMap = null
        options.push (
          <li
            key={ key + 1 } 
            ref={ 'rS' + (key + 1) }
            className={ (this.props.options[key].disabled ? "select__option select__option_default" : (key + 1 === this.state.optionIndex && this.props.showKey === key ? "select__option select__option_selected select__option_highlight" : key + 1 === this.state.optionIndex ? "select__option select__option_highlight" : this.props.showKey === key ? "select__option select__option_selected" : this.state.class)) }
            onMouseDown={ (!this.props.options[key].disabled ? this.optionClick.bind(this, key + 1) : null) } 
            onMouseOver={ this.mouseOver.bind(this, key + 1) } >
            { option.option ? option.option : option.showOption }
          </li>
        )
      }
    }

    if (this.props.findText != '' && options.length == 0) {
      options = ( 
        <li 
          className={ this.state.optionIndex == 0 ? "select__option select__option_highlight" : this.state.class }
          key={ 0 }
          ref={ 'rS0' }
          onMouseOver={ this.mouseOver.bind(this, 0) } > 
          Не найдено 
        </li>
      )
    } else {
      if (this.props.findText == '' && !this.props.search && !this.props.radio) {
        options.unshift (
          <li 
            className={ this.state.optionIndex == 0 ? "select__option select__option_highlight" : this.state.class }
            key={ 0 }
            ref={ 'rS0' }
            onMouseDown={ this.optionClick.bind(this, 0) }
            onMouseOver={ this.mouseOver.bind(this, 0) } > 
            { this.props.placeholder } 
          </li>
        )
      }
    }
    if (this.state.optionsMap && this.state.optionIndex > this.state.optionsMap.length - 1) {
      this.state.optionIndex = 0
    } 
    return options
  }

  render() {
    return (
      <ul className="select__list" id="option_container" ref="selectOptions" style={{ overflow: 'auto', maxHeight: 28 * (this.props.visibleRows || 5) + 10 + 'px' }}>
        {
          this.setOptions()
        }
      </ul>
    )
  }
} 