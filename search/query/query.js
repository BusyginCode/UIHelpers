
export default class Query extends React.Component {

  constructor() {
    super()
    this.stopPropagation = this.stopPropagation.bind(this)
    this.queryEdit = this.queryEdit.bind(this)
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs['s' + this.props.queryKey]).innerText = this.props.value
  }

  stopPropagation(e) {
    e.stopPropagation()
    if (this.props.line) {
      this.props.formEditInput(true)
    } else {
      ReactDOM.findDOMNode(this.refs['s' + this.props.queryKey]).parentNode.parentNode.lastChild.focus()
    }
  }

  setFocus(div) {
    div.focus()
    let range = document.createRange(),
    selection = window.getSelection();
    range.setStartAfter(div.lastChild);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  queryEdit(e) {
    if (e.keyCode == 13) {
      e.preventDefault()
      e.stopPropagation()
      this.props.formEditInput(true)
    }
  }

  render() {
    return (
      <div 
        ref={ this.props.queryKey }
        className='words__tag keyword'
        onClick={ this.stopPropagation } 
        >
        <div 
          ref={ 's' + this.props.queryKey }
         // contentEditable="true" 
          dangerouslySetInnerHTML={{__html: this.props.value}} 
          className='keyword__label'
          onKeyDown={ this.queryEdit }
          >
        </div>
        <div 
          className='words__delete keyword__delete cancel cancel_size_smallest' 
          onClick={ this.props.deleteQuery.bind(null, this.props.queryKey) } 
          >
        </div>
      </div>
    )
  }
}
