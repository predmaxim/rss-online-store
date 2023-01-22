import arrCards from '../../data/cardsData';
import { ProductCards } from './ProductCards';

console.log('Import ProductGrid');

const cards = new ProductCards(arrCards);
cards.render();

export default cards;
