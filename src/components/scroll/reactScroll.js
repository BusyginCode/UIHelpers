import { documentMouseMove, documentMouseUp } from 'newUtils'

export default class ReactScroll extends React.Component {

  constructor() {
    super()
    this.state={
      resolution: null,
      pastMargin: null,
      margin: null,
      parentHeight: null,
      childHeight: null,
      scrollinbBlockHeight: null
    }
    this.mouseFix = this.mouseFix.bind(this)
    this.mouseRelease = this.mouseRelease.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.scrollWheel = this.scrollWheel.bind(this)
    this.clickScroll = this.clickScroll.bind(this)
  }

  initHeights() {
    this.state.parentHeight = ReactDOM.findDOMNode(this.refs.scrollParrent).offsetHeight
    this.state.childHeight = ReactDOM.findDOMNode(this.refs.scrollChild).offsetHeight
  }

  mouseFix(e) {
    e.preventDefault()
    e.stopPropagation()
    this.state.resolution = true
    this.state.defaultY = e.clientY
    this.state.pastMargin = this.state.margin
    documentMouseUp.subscribe(this.mouseRelease)
    documentMouseMove.subscribe(this.mouseMove)
  }

  mouseRelease(e) {
    this.state.resolution = false
    this.state.pastMargin = this.state.margin
    documentMouseUp.unsubscribe(this.mouseRelease)
    documentMouseMove.unsubscribe(this.mouseMove)
  }

  scrollWheel(e) {
    this.initHeights()
    e.preventDefault()
    e.stopPropagation()
    let step = e.deltaY / (ReactDOM.findDOMNode(this.refs.content).offsetHeight / 100) * (this.state.parentHeight / 100)
    if ((this.state.pastMargin + step >= 0) && (this.state.pastMargin + step <= this.state.parentHeight - this.state.childHeight)) {
      this.state.margin = this.state.margin + step
      this.setState({
        margin: this.state.margin,
        pastMargin: this.state.margin
      })
      ReactDOM.findDOMNode(this.refs.scroll).scrollTop = this.realScrollCalculate(this.state.margin)
    } else {
      this.edges(step)
    }
  }

  realScrollCalculate(fakeMargin) {
    return (fakeMargin / (this.state.parentHeight / 100) * (ReactDOM.findDOMNode(this.refs.content).offsetHeight / 100))     
  }

  edges(step) {
    if (this.state.pastMargin + step < 0) {
      this.state.margin = 0
        this.setState({
          margin: this.state.margin,
          pastMargin: this.state.margin
        })
      }
    if (this.state.pastMargin + step > this.state.parentHeight - this.state.childHeight) {
      this.state.margin = this.state.parentHeight - this.state.childHeight
      this.setState({
        margin: this.state.margin
      })
    }
    ReactDOM.findDOMNode(this.refs.scroll).scrollTop = this.realScrollCalculate(this.state.margin)
  }

  mouseMove(e) {
    this.initHeights()
    if (this.state.resolution) {
      let indentY = e.clientY - this.state.defaultY
      if ((this.state.pastMargin + indentY >= 0) && (this.state.pastMargin + indentY <= this.state.parentHeight - this.state.childHeight)) {
        this.state.margin = Math.ceil(this.state.pastMargin + indentY)
      } else {
        this.edges(indentY)
      }
      ReactDOM.findDOMNode(this.refs.scroll).scrollTop = this.realScrollCalculate(this.state.margin)
      this.forceUpdate()
    }
  }

  scrollBlockHeightCalculation() {
    return Math.round((ReactDOM.findDOMNode(this.refs.scroll).offsetHeight / (ReactDOM.findDOMNode(this.refs.content).offsetHeight / 100)) * ReactDOM.findDOMNode(this.refs.scroll).offsetHeight / 100)
  }

  clickScroll(e) {
    e.stopPropagation()
    this.initHeights()
    let step = e.clientY - 140
    if (step > this.state.parentHeight - this.state.childHeight) {
      step = this.state.parentHeight - this.state.childHeight
    } 
    this.setState({
      margin: step,
      pastMargin: step
    })
    ReactDOM.findDOMNode(this.refs.scroll).scrollTop = this.realScrollCalculate(step)
  }

  componentDidMount() {
    this.setState({
      scrollinbBlockHeight: this.scrollBlockHeightCalculation()
    })
    this.initHeights()
  }

  componentWillUpdate() {
    this.state.scrollinbBlockHeight = this.scrollBlockHeightCalculation()
  }

  render() {
    return (
      <div 
        style={{ width: 500 + 'px' }}
        onMouseUp={ this.mouseRelease }
        onWheel={ this.scrollWheel }
        className="scroll"
      >
        <div style={{ height: 400 + 'px' }} ref='scroll' className="scroll__content">
          <div ref='content'>
            {
              this.props.children
            }
          </div>
        </div>
        <div 
          ref="scrollParrent"
          onMouseDown={ this.clickScroll }
          className="scroll__bar"
        >
          <div 
            style={{ height: this.state.scrollinbBlockHeight + 'px', marginTop: this.state.margin + 'px' }}
            ref="scrollChild"
            className="scroll__track"
            onMouseDown={ this.mouseFix }
          >
          </div>
        </div>
      </div>
    )
  }
}