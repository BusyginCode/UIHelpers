export default class TesseraItem extends React.Component {

	render() {

	  return(

	    <div style={ this.props.blockStyles } className="tessera__item overlook goods">
{/*   <div style={ this.props.blockStyles } className="overlook goods goods_bookmark_visible goods_state_deleted">   */}
	        <img src={ this.props.imgSrc } style={ this.props.imageStyles } className="overlook__image goods__image"/>
          <a className="overlook__container" href="#">
            <div className="overlook__gradient"></div>
            <div className="overlook__overlay">
              <div className="overlook__content">
                <div className="overlook__body">
                  <div className="overlook__discount">
                    <div className="ringed ringed_size_larger ringed_color_blue ellipsis" title="Бесплатная доставка на товары стоимостью от 1000 руб.">Бесплатная доставка на товары стоимостью от 1000 руб.</div>
                    <div className="ringed ringed_size_larger ringed_color_pink ellipsis" title="Скидка на заказ 5% при покупке на 1000 и более рублей">Скидка на заказ 5% при покупке на 1000 и более рублей</div>
                    <div className="ringed ringed_size_larger ringed_color_yellow ellipsis" title="Еще одна скидка так же грустно обрубленная">Еще одна скидка так же грустно обрубленная</div>
                  </div>
                  {/*
                   <div className="overlook__no-discount">
                   нет скидок ???
                   </div>
                   */}
                  {/*
                   <div className="overlook__contact-seller">
                   написать продавцу ???
                   </div>
                   */}
                </div>
                <div className="overlook__foot">
                  <div className="overlook__title ellipsis">Белый свадебный шарф-шалшалшал</div>
                  <div className="overlook__delivery">
                    <span className="delivery-info delivery-info_text_larger">20 мар, 2015</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="overlook__price">
              1 400 <span className="currency currency_id_rub"></span>
            </span>
            {/*
            <span className="overlook__alert">
              Товар удален<br/> 4 дек 2014
            </span>
             */}
          </a>
          <div className="overlook__favorite goods__favorites">
            <button className="overlook__bookmark bookmark bookmark_size_smaller goods__bookmark"></button>
          </div>
	    </div>
	  );
	}
};
