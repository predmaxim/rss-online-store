import arrCards from '../../data/cardsData';
import { ProductCards } from './ProductCards';

console.log('Import ProductGrid');

const cards = new ProductCards(arrCards);
cards.render();

function applyFilter(e: CustomEvent): void {
  cards.filter(e.detail.name, e.detail.values);
}

addEventListener('dual-slider', ((e: CustomEvent) => applyFilter(e)) as EventListener);
addEventListener('checkbox', ((e: CustomEvent) => applyFilter(e)) as EventListener);

export default cards;
