import arrCards from '../../data/cardsData';
import ProductCards from './ProductCards';
// import 'Filter/filter';
import 'ShopHeader/shop-header';
import 'ProductGrid/product-grid';
import 'View/view';
import 'Sort/sort';
import {
  showFilterBtn,
  // priceSlider,
  // stockSlider,
  // checkboxFilterYear,
  // checkboxFilterCategory,
} from '../../components/filter/filter';
console.log('Import Shop');

const cards = new ProductCards(arrCards);
cards.render();

showFilterBtn();

window.addEventListener('dual-slider', ((e: CustomEvent) => {
  const [min, max] = e.detail.minmax;
  const filter = e.detail.name;

  cards.addRange(filter, min, max);
  cards.render();
  console.log(cards.arrCardsFiltered);
}) as EventListener);

// priceSlider.setMinMax(cards.arrCards);
// stockSlider.setMinMax(cards.arrCards);

export default cards;
