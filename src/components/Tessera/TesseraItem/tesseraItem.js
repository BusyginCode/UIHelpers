import React, { PropTypes } from 'react';
// import Currency from '../../currency/currency';
// import Deals from '../../deals/deals';

export default class TesseraItemTest extends React.Component {

  static propTypes = {
    blockStyles: PropTypes.object,
    item: PropTypes.object,
    // imgSrc: PropTypes.string,
    imageStyles: PropTypes.object,
  }

  render() {
    return (
      <div className="mosaic__item overlook goods" style={this.props.blockStyles}>
        <a className="overlook__container">
          <img src={this.props.item.mosaic_image} style={this.props.imageStyles} alt="" />
          <div className="overlook__gradient" />
          <div className="overlook__overlay">
            <div className="overlook__content">
              <div className="overlook__body">
                <div className="overlook__discount">
                  {
                    // <Deals dealsToView={this.props.item} />
                  }
                </div>
              </div>
              <div className="overlook__foot">
                <div className="overlook__title ellipsis">{this.props.item.name}</div>
                <div className="overlook__delivery">
                  <span className="delivery-info delivery-info_text_larger">{this.props.item.will_send_during}</span>
                </div>
              </div>
            </div>
          </div>
          <span className="overlook__price">
            {
              // <Currency price={this.props.item.price} />
            }
          </span>
        </a>
        <div className="overlook__favorite goods__favorites">
          <button className="preview__bookmark bookmark bookmark_size_smaller" />
        </div>
      </div>
    );
  }
}
