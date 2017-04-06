import Query from './query/query'
import { clickInBlock, documentClick, documentKeyDown, indexOfObject } from 'newUtils'
import { isIE } from 'newConsts'

export default class SearchContainer extends React.Component {

  constructor(props) {
    super()
    this.state = {
      active: null,
      wheelCheck: null,
      wordsFocus: null,
      blurBlock: null,
      edit: null,
      text: '',
      wordsClass: null,
      optionHighlightIndex: 0,
      options: [],
      optionsObjects: []
    }
    this.enterPrevDefault = this.enterPrevDefault.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.wordClick = this.wordClick.bind(this)
    this.wordBlur = this.wordBlur.bind(this)
    this.enter = this.enter.bind(this)
    this.formEditInput = this.formEditInput.bind(this)
    this.focus = this.focus.bind(this)
    this.setWordsClassname = this.setWordsClassname.bind(this)
    this.inputFocus = this.inputFocus.bind(this)
    this.wheel = this.wheel.bind(this)
  }

  deleteQuery = (key, e) => {
    if (e) {
      e.stopPropagation()
    }
    this.props.deleteQuery(key)
  };

  componentWillUpdate() {
    if (this.props.queries.length > this.props.maxQueries) {
      this.deleteQuery(this.props.queries.length - 1)
    }
  }


  packRender() {
    return this.props.queries.map((text, key) => {
      return (
        <Query
          value={ text }
          key={ key }
          line={ this.props.line }
          queryKey={ key }
          formEditInput = { this.formEditInput }
          deleteQuery={ this.deleteQuery }
        />
      )
    })
  }

  validCheck(text) {
    console.log(this.props.checkString)
    if (!this.props.checkString ||
    (typeof this.props.checkString === 'function' && this.props.checkString(text)) ||
    typeof this.props.checkString !== 'function' && this.props.checkString.test(text)) {
      return true
    }
  }


  inputChange(e) {
    let input = ReactDOM.findDOMNode(this.refs.searchInput)
    if (this.props.queries.length + 1 <= this.props.maxQueries) {
      if (this.validCheck(e.target.value)) {
        this.setState({
          text: (e.target.value.length == 1 && (this.props.separators.indexOf(e.target.value) >= 0 || e.keyCode == 32) ? '' : e.target.value)
        })
        if (this.props.separators.indexOf(e.target.value[e.target.value.length - 1]) >= 0 && !this.state.edit) {
          this.enter(e.target.value.substr(0, e.target.value.length - 1))
        }
        this.wheelCheck()
      } else {
        this.setState({
          text: e.target.value.substr(0, e.target.value.length - 1)
        })
        input.focus()
      }
    }
  }

  enterPrevDefault(e) {
    let input = ReactDOM.findDOMNode(this.refs.searchInput)
    this.setState({
      text:(e.keyCode == 32 && e.target.value.length == 1 ? '' : e.target.value)
    })
    if (e.keyCode == 8 && e.target.value.length == 0 && !this.state.edit) {
      e.preventDefault()
      if (this.props.line) {
        this.formEditInput(false)
      } else if (this.props.queries.length !== 0) {
        this.props.deleteQuery(this.props.queries.length - 1)
      }
    }  
    if (e.keyCode == 13) {
      this.state.blurBlock = true
      e.preventDefault()
      this.setState({
        blurBlock: true
      })
      this.enter(e.target.value, true)
      input.blur()
    }
    if (e.keyCode == 40 || e.keyCode == 38) {
      e.preventDefault()
    }
  }

  formEditInput(blurBlock) {
    this.state.blurBlock = blurBlock
    let input = ReactDOM.findDOMNode(this.refs.searchInput)
    this.setState({
      edit: true,
      text: this.props.queries.join(', ')
    })
    if (this.props.queries.join(', ').length > 0) {
      input.focus()
    }
  }

  enter(text, needSearch) {
    let input = ReactDOM.findDOMNode(this.refs.searchInput),
      queries = []
    if (this.props.queries.indexOf(text) < 0 || this.state.edit) {
      if (text.indexOf(',') >= 0 || this.state.edit) {
        text.split(', ').forEach((query) => {
          query.split(',').forEach((query) => {
            if (queries.indexOf(query) < 0 && query.indexOf('<') < 0 && query.indexOf('>') < 0 && query.length - 1 > 1) {
              if (query.length < this.props.maxLength) {
                queries.push(query)
              } else {
                queries.push(query.slice(0, this.props.maxLength))
              }
            }
          })
        })
        this.setState({
          edit: false
        })
        this.props.enterQuery(queries, needSearch)
      } else {
        this.setState({
          edit: false
        })
        if (text.length > 1) {
          this.props.enterQuery(text, needSearch)
        }
      }
    }
    this.setState({
      text: ''
    })
  }

  // setFocus(div) {
  //   div.focus()
  //   let range = document.createRange(),
  //   selection = window.getSelection();
  //   range.setStartAfter(div.lastChild);
  //   selection.removeAllRanges();
  //   selection.addRange(range);
  // }

  focus() {
    ReactDOM.findDOMNode(this.refs.searchInput).focus()
  }

  wheelCheck() {
    this.setState({
      wheelCheck: (ReactDOM.findDOMNode(this.refs.ribbon).offsetWidth > ReactDOM.findDOMNode(this.refs.words).offsetWidth ? true : false)
    })
  }

  wheel(e) {
    if (e.deltaX < 0) {
      ReactDOM.findDOMNode(this.refs.words__container).scrollLeft -= 100
    }
  }

  wordBlur(e) {
    if (!this.state.blurBlock || this.state.edit || !this.props.line) {
      if (this.props.blurControl && this.props.blurControl.search) {
        this.enter(ReactDOM.findDOMNode(this.refs.searchInput).value, true)
      } 
      this.setState({
        blurBlock: false,
        edit: false
      })
      this.setState({
        text: ''
      })
    } 
    this.setState({
      wordFocus: false
    })
    if (!this.props.line) {
      documentClick.unsubscribe(this.wordBlur)
      documentKeyDown.unsubscribe(this.keyControl)
    } else {
      delete this.props.blurControl.search
      delete this.props.blurControl.focus
    }
  }

  wordClick() {
    this.setState({
      wordFocus: true
    })
  }

  inputFocus() {
    if (!this.props.line) {
      documentKeyDown.subscribe(this.keyControl)
      setTimeout(() => {documentClick.subscribe(this.wordBlur)}, 200)
    } else {
      this.props.blurControl.focus = true
    }
  }

  setWordsClassname() {
    return (
    'search__widget words words_line ' + (
        this.state.wheelCheck && this.state.wordFocus ? 
          'words_focus words_scrolled ' 
        : this.state.wheelCheck ? 
          'words_scrolled ' 
          : this.state.wordFocus ?
            'words_focus ' : ''))
  }

  headClassFormation() {
    return (
      'words' + (this.state.wordFocus ? ' words_focus ' : '') + (this.state.text.length > 0 ? ' words_active' : '')
    )
  }

  render() {
    return (
      <div 
        className={ (this.props.line ? this.setWordsClassname() : this.headClassFormation()) } 
        ref="words"
        onMouseDown={ this.wordClick }
        onBlur={ (this.props.line ? this.wordBlur : null) }
        >
        {
          !this.props.line ? 
            <div 
              className="words__dropdown" 
              style={{  }}
              ref="dropDown"
            >
              <ul 
                className="words__list"
                ref="wordsList"
              >
                {
                  this.setOption()
                }
              </ul>
            </div>
          : null
        }
        <div 
          className={ 'words__stage' + (this.props.line ? ' search__input' : '') }
          ref='search'
          id='search'
          >
          <div 
            className='words__container' 
            ref='words__container'
            id='words__container'
            >
            <div 
              className='words__ribbon' 
              ref='ribbon'>
              {
                !this.state.edit ? this.packRender() : null
              }
              <input
                value={ this.state.text } 
                tabIndex={ "-1" }
                className='words__input' 
                maxLength={ this.state.edit ? Infinity : this.props.maxLength }
                placeholder={ (this.props.queries.length == 0 && !isIE) ? this.props.placeholder : null }
                type={ this.props.search ? 'search' : 'text' } 
                ref="searchInput"
                onChange={ this.inputChange }
                onKeyDown={ this.enterPrevDefault }
                onFocus={ this.inputFocus }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  /*
  * Dropdown type functions
  */

  componentDidMount() {
    this.wheelCheck()
    if (!this.props.line) {
      ReactDOM.findDOMNode(this.refs.dropDown).style.paddingTop = ReactDOM.findDOMNode(this.refs.search).offsetHeight + 'px'
    }
  }

  componentDidUpdate() {
    if (!this.props.line) {
      ReactDOM.findDOMNode(this.refs.dropDown).style.paddingTop = ReactDOM.findDOMNode(this.refs.search).offsetHeight + 'px'
      if (this.state.text.length === 0) {
        this.state.optionHighlightIndex = 0
        ReactDOM.findDOMNode(this.refs.wordsList).scrollTop = 0
      }
    }
  }

  optionClick(option) {
    this.props.enterQuery(option)
    this.setState({
      text: '',
      optionHighlightIndex: 0
    })
  }

  mouseOver(key, e) {
    this.setState({
      optionHighlightIndex: key
    })
  }

  setOption() {

    this.state.options = []

    if (this.state.text && this.props.options.filter(option => option.toString().toLowerCase().indexOf(this.state.text.toLowerCase()) >= 0).length === 0) {
      return (
        <div className='words__option'>Ничего не найдено</div>
      )
    } else {
      return this.props.options.filter((option) => {
        return (!this.state.text || (option.toString().toLowerCase().indexOf(this.state.text) !== -1))
      }).map((option, key) => {
        this.state.options.push(option)
        return (
          <li 
            className={ "words__option" + (this.state.optionHighlightIndex === key ? ' words__option_highlight' : '') } 
            onClick={ this.optionClick.bind(this, option) } 
            onMouseOver={ this.mouseOver.bind(this, key) }
            key={ option }
            ref={ key }
          >
            { option }
          </li>
        )
      })
    }

    return this.state.options

  }

  keyControl = (e) => {

    if (e.keyCode == 13 && this.state.options.length > 0) {
      this.optionClick(this.state.options[this.state.optionHighlightIndex])
    }

    if (e.keyCode == 40 && (this.state.optionHighlightIndex < this.state.options.length - 1)) {
      this.setState({
        optionHighlightIndex: this.state.optionHighlightIndex + 1
      }, () => {
        if ((ReactDOM.findDOMNode(this.refs[this.state.optionHighlightIndex]).offsetTop - 20) - ReactDOM.findDOMNode(this.refs.wordsList).scrollTop > 28 * this.props.visibleRows + 10) {
          this.setScroll(true)
        }
      })
    } 
    if (e.keyCode == 38 && this.state.optionHighlightIndex > 0) {
      this.setState({
        optionHighlightIndex: this.state.optionHighlightIndex - 1
      }, () => {
        if (this.state.optionHighlightIndex >= 0 && (ReactDOM.findDOMNode(this.refs[this.state.optionHighlightIndex]).offsetTop - 26) < ReactDOM.findDOMNode(this.refs.wordsList).scrollTop) {
          this.setScroll(false)
        }
      })
    }
  };

  /*
  *
  * setScroll ==> function add and sub. scroll
  *
  */

  setScroll(sign) {
    ReactDOM.findDOMNode(this.refs.wordsList).scrollTop += (ReactDOM.findDOMNode(this.refs[this.state.optionHighlightIndex]).offsetHeight * (sign ? 1 : -1))
  }

}

