// import { arrCards } from '../../../data/cardsData';
import { DualSliderOptions, DualSlider } from './DualSlider';
import ICard from '../../../data/ICard';
import { cards } from '../../../pages/shop/shop';
import ProductCards from '../../../pages/shop/ProductCards';
console.log('Import dual-slider');

function getMinPrice(cards: ProductCards): number {
  const arr = cards.arrCardsFiltered ? cards.arrCardsFiltered.slice() : cards.arrCards.slice();
  console.log(arr);
  return arr.reduce((acc: number, cur: ICard) => {
    return cur.price < acc ? (acc = cur.price) : acc;
  }, 0);
}

function getMaxPrice(cards: ProductCards): number {
  const arr = cards.arrCardsFiltered ? cards.arrCardsFiltered.slice() : cards.arrCards.slice();
  return arr.reduce((acc: number, cur: ICard) => {
    return cur.price > acc ? (acc = cur.price) : acc;
  }, 0);
}

const optionsPrice: DualSliderOptions = {
  fromSlider: <HTMLInputElement>document.querySelector('.from-slider-price'),
  toSlider: <HTMLInputElement>document.querySelector('.to-slider-price'),
  fromVal: <HTMLDivElement>document.querySelector('.from-value-price'),
  toVal: <HTMLDivElement>document.querySelector('.to-value-price'),
  sliderColor: '#C1B1AA',
  rangeColor: '#392E2A',
  min: 0,
  max: 100,
};

const optionsInStock: DualSliderOptions = {
  fromSlider: <HTMLInputElement>document.querySelector('.from-slider-instock'),
  toSlider: <HTMLInputElement>document.querySelector('.to-slider-instock'),
  fromVal: <HTMLDivElement>document.querySelector('.from-value-instock'),
  toVal: <HTMLDivElement>document.querySelector('.to-value-instock'),
  sliderColor: '#C1B1AA',
  rangeColor: '#392E2A',
  min: 0,
  max: 100,
};

const priceSlider: DualSlider = new DualSlider(optionsPrice);
const inStockSlider: DualSlider = new DualSlider(optionsInStock);

priceSlider.start();
inStockSlider.start();

export { priceSlider, inStockSlider };
