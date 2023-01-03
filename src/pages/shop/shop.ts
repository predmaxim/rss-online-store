import arrCards from '../../data/cardsData';
import ProductCards from './ProductCards';
// import 'Filter/filter';
import 'ShopHeader/shop-header';
import 'ProductGrid/product-grid';
import 'View/view';
import 'Sort/sort';
import {
  showFilterBtn,
  priceSlider,
  stockSlider,
  // checkboxFilterYear,
  // checkboxFilterCategory,
} from '../../components/filter/filter';
console.log('Import Shop');

const cards = new ProductCards(arrCards);
cards.render();

showFilterBtn();
// priceSlider.setMinMax(cards.arrCards);
// stockSlider.setMinMax(cards.arrCards);

addEventListener('filter', () => {
  priceSlider.setMinMax(cards.arrCardsFiltered);
  stockSlider.setMinMax(cards.arrCardsFiltered);
});

export default cards;
