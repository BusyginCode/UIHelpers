import TesseraItem from './tesseraItem/tesseraItem'

export default class Tessera extends React.Component {

  isServer() {
    return (typeof window !== 'undefined') ? true : false
  }

  constructor() {
    super()
    this.state = {
      borderTop: 8,
      marginTop: 0,
      borderLeft: 10
    }
  }

  /**
  *
  * createElementProps is the function which set properties for TesseraItems
  *
  **/

  createElementProps(collectProps) {
    return {
      imageStyles: {
        marginTop: collectProps.marginTop,
        marginLeft: collectProps.marginLeft
      }, 
      blockStyles: {
        width: collectProps.blockWidth + '%',
        borderLeft: (collectProps.renderIndex == 0) ? 0 : collectProps.borderLeft + 'px solid white',
        borderTop: collectProps.borderTop + 'px solid white',
        position: 'relative', 
        height: this.props.blockHeight + 'px', 
        overflow: 'hidden'
      },
      height: collectProps.imageHeight,
      imgSrc: collectProps.imgSrc,
    }
  }

  /**
  *
  * calculatePositions is the function, which calculate size, indent of TesseraItem also place were it will be
  *
  **/

  calculatePositions() {              
    let content = this.props.products,
      renderWidth = 0,
      renderElement = {},
      renderElements = [],
      index = 0,
      items = [],
      contentWidth = 0,
      workContentPercent = 0,
      collectProps = {}
    if (this.isServer()) {
      contentWidth = (document.body.offsetWidth) / 100 * this.props.contentWidth,
      workContentPercent = (document.body.offsetWidth) / 100 * this.props.contentWidth / 100
    } else {
      contentWidth = this.props.documentWidth / 100 * this.props.contentWidth,
      workContentPercent = this.props.documentWidth / 100 * this.props.contentWidth / 100
    }
    for (let key = 0; key < content.length; key++) {
      let itemWidth = content[key].width * this.props.blockHeight / content[key].height
      if (renderWidth >= contentWidth && itemWidth < contentWidth) {
        items.push(renderElements)
        renderElements = []
        renderWidth = 0
        index = 0
        renderWidth += itemWidth
        collectProps = {
          blockWidth: itemWidth / workContentPercent, 
          imageHeight: content[key].height,
          borderLeft: 0,
          borderTop: this.state.borderTop,
          marginTop: this.state.marginTop,
          marginLeft: (itemWidth > contentWidth) ? (contentWidth - itemWidth) / 2 : 0,
          renderIndex: key
        }
        renderElement = this.createElementProps(collectProps)
        ++index
        renderElements.push(renderElement)  
      } else {
        if (itemWidth <= (contentWidth - renderWidth)) {
          renderWidth += itemWidth
          collectProps = {
            blockWidth: itemWidth / workContentPercent, 
            imageHeight: content[key].height,
            borderLeft: this.state.borderLeft,
            borderTop: this.state.borderTop,
            marginTop: this.state.marginTop,
            marginLeft: (itemWidth > contentWidth) ? (contentWidth - itemWidth) / 2 : 0,
            renderIndex: key
          }
          renderElement = this.createElementProps(collectProps)
          ++index
          renderElements.push(renderElement)
          if (key == content.length -1) {
            this.stretch(renderElements, workContentPercent, contentWidth, renderWidth)
            items.push(renderElements)
          }    
        } else {
          let currentWidth = 0
          if (itemWidth / workContentPercent > 100) {
            currentWidth = contentWidth
          } else {
            currentWidth = itemWidth
          }
          this.stretch(renderElements, workContentPercent, contentWidth, renderWidth);
          index = 0
          ++index
          items.push(renderElements)
          renderElements = []
          renderWidth = 0
          renderWidth += currentWidth
          collectProps = {
            blockWidth:currentWidth / workContentPercent, 
            imageHeight:content[key].height,
            borderLeft: 0,
            borderTop: this.state.borderTop,
            marginTop: this.state.marginTop,
            marginLeft: (itemWidth > contentWidth) ? (contentWidth - itemWidth) / 2 : 0,
            renderIndex: key
          }
          renderElement = this.createElementProps(collectProps)
          renderElements.push(renderElement)
          if (key == content.length - 1 && index == 1) {
            if (!this.props.lastRow) {
              break
            } else {
              items.push(renderElements)
            }
          }
        }
      }
    }
    return this.createElements(items, workContentPercent)
  }

  /*
  *
  * stretch is the function, which stretches the blocks, if it need
  *
  */

  stretch(items, workContentPercent, contentWidth, renderWidth) {
    let coeficientW = contentWidth / renderWidth,
    lastWidth = 0,
    lastWidthPercent = 0,
    changedPercents = 0,
    marginTop = 0
    for (let key = 0; key < items.length; key++) {
      if (parseFloat(items[key].blockStyles.width) * workContentPercent < contentWidth) {
        lastWidth = parseFloat(items[key].blockStyles.width) * workContentPercent
        lastWidthPercent = lastWidth / 100
        items[key].blockStyles.width = (parseFloat(items[key].blockStyles.width) * workContentPercent * coeficientW) / workContentPercent + '%'
        changedPercents = (parseFloat(items[key].blockStyles.width) * workContentPercent - lastWidth) / lastWidthPercent
        marginTop = ((items[key].height / 100) * changedPercents) / 2 + (this.state.marginTop / 2)
        items[key].imageStyles.marginTop = -marginTop + 'px'
        items[key].imageStyles.width = 100 + '%'
      }
    } 
  }

  /*
  *
  * when the window is resize, component is update
  *
  */

  componentDidMount() {
    window.onresize = () => {
      this.forceUpdate()
    }
  }

  /*
  *
  * createElements is the function, which create Tesera items and give them properties
  *
  */

  createElements(items, workContentPercent) {
    let content = this.props.products,
      index = -1
    return items.map((item) => {
      return item.map((block, key) => {
        ++index
        return <TesseraItem
          item={content[index]}
          imgSrc={block.imgSrc} 
          imageStyles={block.imageStyles} 
          blockStyles={block.blockStyles} 
          />
        })      
    })
  }

  render() {
    return (
      <div className="tessera" style={{ width: this.props.contentWidth + '%' }}>
        <div>
          {
            this.calculatePositions()
          }
        </div>
      </div>
    )
  }
}

