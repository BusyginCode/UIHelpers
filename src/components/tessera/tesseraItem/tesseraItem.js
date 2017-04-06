import Currency from '../../currency/currency'
import Deals from '../../deals/deals'
import { googleAnalytic } from 'utils'
import { productViewUrl } from 'consts'

export default class TesseraItemTest extends React.Component {

	checkWishList() {
		if ((typeof window !== 'undefined') && window.loggedIn) {
			if (window.wishListIds.indexOf(this.props.item.id) >= 0) {
				return ' bookmark_checked_true'
			} else {
				return ''
			}
		}
		return ''
	}

	render() {
		return(
			<div className="mosaic__item overlook goods" style={ this.props.blockStyles } onClick={ googleAnalytic.pushAnalytic.bind(null, 'itemClick', {item: this.props.item, position: this.props.index + 1}) }>
				<a className="overlook__container"
					href={ productViewUrl(this.props.item.id, this.props.item.translitName) }>
					<img src={ this.props.item.mosaic_image } style={ this.props.imageStyles } alt=""/>
					<div className="overlook__gradient"></div>
					<div className="overlook__overlay">
						<div className="overlook__content">
							<div className="overlook__body">
								<div className="overlook__discount">
									<Deals dealsToView={ this.props.item }/>
								</div>
							</div>
							<div className="overlook__foot">
								<div className="overlook__title ellipsis">{ this.props.item.name }</div>
									<div className="overlook__delivery">
										<span className="delivery-info delivery-info_text_larger">{ this.props.item.will_send_during }</span>
									</div>
								</div>
							</div>
					</div>
					<span className="overlook__price">
						<Currency price={ this.props.item.price } />
					</span>
				</a>
				<div className="overlook__favorite goods__favorites">
					<button className={ "preview__bookmark bookmark bookmark_size_smaller" + this.checkWishList()} id={this.props.item.id }></button>
				</div>
			</div>
		)
	}
}