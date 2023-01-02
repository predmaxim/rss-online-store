import arrCards from '../../data/cardsData';
import ProductCards from './ProductCards';
import 'Filter/filter';
import 'ShopHeader/shop-header';
import 'ProductGrid/product-grid';
import 'View/view';
import 'Sort/sort';
console.log('Import Shop');

const cards = new ProductCards(arrCards);
cards.render();

export default cards;
