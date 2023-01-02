import { DualSliderOptions, DualSlider } from './DualSlider';
console.log('Import dual-slider');

const optionsPrice: DualSliderOptions = {
  fromSlider: '.from-slider-price',
  toSlider: '.to-slider-price',
  fromVal: '.from-value-price',
  toVal: '.to-value-price',
  sliderColor: '#C1B1AA',
  rangeColor: '#392E2A',
};

const optionsInStock: DualSliderOptions = {
  fromSlider: '.from-slider-instock',
  toSlider: '.to-slider-instock',
  fromVal: '.from-value-instock',
  toVal: '.to-value-instock',
  sliderColor: '#C1B1AA',
  rangeColor: '#392E2A',
};

const priceSlider: DualSlider = new DualSlider(optionsPrice);
const stockSlider: DualSlider = new DualSlider(optionsInStock);

priceSlider.init();
stockSlider.init();

export { priceSlider, stockSlider };
