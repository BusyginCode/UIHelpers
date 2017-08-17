import React, { PropTypes } from 'react';
import TesseraItem from './TesseraItem/tesseraItem';

const isServer = () => (typeof window === 'undefined');

export default class Tessera extends React.Component {

  static propTypes = {
    blockHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    documentWidth: PropTypes.number,
    products: PropTypes.array,
    lastRow: PropTypes.bool,
  }

  state = {
    borderTop: 8,
    marginTop: 0,
    borderLeft: 10
  };

  /*
  *
  * when the window is resize, component is update
  *
  */

  componentDidMount() {
    window.onresize = () => {
      this.forceUpdate();
    };
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
        width: `${collectProps.blockWidth}%`,
        borderLeft: (collectProps.renderIndex === 0) ? 0 :
          `${collectProps.borderLeft}px solid white`,
        borderTop: `${collectProps.borderTop}px solid white`,
        position: 'relative',
        height: `${this.props.blockHeight}px`,
        overflow: 'hidden'
      },
      height: collectProps.imageHeight,
      imgSrc: collectProps.imgSrc,
    };
  }

  /**
  *
  * calculatePositions is the function, which calculate size,
  * indent of TesseraItem also place were it will be
  *
  **/

  calculatePositions() {
    const content = this.props.products;
    let renderWidth = 0;
    let renderElement = {};
    let renderElements = [];
    let index = 0;
    const items = [];
    let contentWidth = 0;
    let workContentPercent = 0;
    let collectProps = {};

    if (!isServer()) {
      contentWidth = (document.body.offsetWidth / 100) * this.props.contentWidth;
      workContentPercent = ((document.body.offsetWidth / 100) * this.props.contentWidth) / 100;
    } else {
      contentWidth = (this.props.documentWidth / 100) * this.props.contentWidth;
      workContentPercent = ((this.props.documentWidth / 100) * this.props.contentWidth) / 100;
    }
    for (let key = 0; key < content.length; key += 1) {
      const item = content[key];
      const itemWidth = (item.width * this.props.blockHeight) / item.height;
      const getCollectProps = borderLeft => ({
        blockWidth: itemWidth / workContentPercent,
        imageHeight: item.height,
        borderLeft,
        borderTop: this.state.borderTop,
        marginTop: this.state.marginTop,
        marginLeft: (itemWidth > contentWidth) ? (contentWidth - itemWidth) / 2 : 0,
        renderIndex: key
      });
      if (renderWidth >= contentWidth && itemWidth < contentWidth) {
        items.push(renderElements);
        renderElements = [];
        renderWidth = 0;
        index = 0;
        renderWidth += itemWidth;
        collectProps = getCollectProps(0);
        renderElement = this.createElementProps(collectProps);
        index += 1;
        renderElements.push(renderElement);
      } else if (itemWidth <= (contentWidth - renderWidth)) {
        renderWidth += itemWidth;
        collectProps = getCollectProps(this.state.borderLeft);
        renderElement = this.createElementProps(collectProps);
        index += 1;
        renderElements.push(renderElement);
        if (key === content.length - 1) {
          this.stretch(renderElements, workContentPercent, contentWidth, renderWidth);
          items.push(renderElements);
        }
      } else {
        let currentWidth = 0;
        if (itemWidth / workContentPercent > 100) {
          currentWidth = contentWidth;
        } else {
          currentWidth = itemWidth;
        }
        this.stretch(renderElements, workContentPercent, contentWidth, renderWidth);
        index = 0;
        index += 1;
        items.push(renderElements);
        renderElements = [];
        renderWidth = 0;
        renderWidth += currentWidth;
        collectProps = getCollectProps(0);
        renderElement = this.createElementProps(collectProps);
        renderElements.push(renderElement);
        if (key === content.length - 1 && index === 1) {
          if (!this.props.lastRow) {
            break;
          } else {
            items.push(renderElements);
          }
        }
      }
    }
    return this.createElements(items, workContentPercent);
  }

  /*
  *
  * stretch is the function, which stretches the blocks, if it need
  *
  */

  stretch(items, workContentPercent, contentWidth, renderWidth) {
    const coeficientW = contentWidth / renderWidth;
    let lastWidth = 0;
    let lastWidthPercent = 0;
    let changedPercents = 0;
    let marginTop = 0;
    for (let key = 0; key < items.length; key += 1) {
      if (parseFloat(items[key].blockStyles.width) * workContentPercent < contentWidth) {
        lastWidth = parseFloat(items[key].blockStyles.width) * workContentPercent;
        lastWidthPercent = lastWidth / 100;
        items[key].blockStyles.width = `${((parseFloat(items[key].blockStyles.width)
          * workContentPercent) * coeficientW) / workContentPercent
        }%`;
        changedPercents = ((parseFloat(items[key].blockStyles.width) * workContentPercent)
          - lastWidth) / lastWidthPercent;
        marginTop = (((items[key].height / 100) * changedPercents) / 2) +
          (this.state.marginTop / 2);
        items[key].imageStyles.marginTop = `${-marginTop}px`;
        items[key].imageStyles.width = `${100}%`;
      }
    }
  }

  /*
  *
  * createElements is the function, which create Tesera items and give them properties
  *
  */

  createElements(items) {
    const content = this.props.products;
    let index = -1;
    return items.map(item => item.map((block) => {
      index += 1;
      return (<TesseraItem
        item={content[index]}
        imgSrc={block.imgSrc}
        imageStyles={block.imageStyles}
        blockStyles={block.blockStyles}
      />);
    }));
  }

  render() {
    return (
      <div className="tessera" style={{ width: `${this.props.contentWidth}%` }}>
        <div>
          {this.calculatePositions()}
        </div>
      </div>
    );
  }
}
