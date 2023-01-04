import { DualSliderOptions, DualSlider } from './dual-slider/DualSlider';
import { CheckboxFilterOptions, CheckboxFilter } from './checkbox/CheckboxFilter';
import { matchMediaQueries } from '../base/base';

console.log('Import Filter');

// Mobile filter button
const showFilterBtn = (): void => {
  if (matchMediaQueries('max', '640px')) {
    const filterIcon = <HTMLDivElement>document.querySelector('.filter-icon');
    const filter = <HTMLDivElement>document.querySelector('.filter-container');

    filterIcon.classList.toggle('hide');
    filter.classList.toggle('hide');

    filterIcon.addEventListener('click', (): void => {
      filter.classList.toggle('hide');
      filterIcon.classList.toggle('active');
    });
  }
};

// checkbox
const optionsYear: CheckboxFilterOptions = {
  filterBody: '.filter-type-checkbox-year',
  filterType: 'year',
};

const optionsCategory: CheckboxFilterOptions = {
  filterBody: '.filter-type-checkbox-category',
  filterType: 'category',
};

const checkboxFilterYear = new CheckboxFilter(optionsYear);
const checkboxFilterCategory = new CheckboxFilter(optionsCategory);

checkboxFilterYear.init();
checkboxFilterCategory.init();

// dual-slider
const optionsPrice: DualSliderOptions = {
  fromSlider: 'from-slider-price',
  toSlider: 'to-slider-price',
  fromVal: 'from-value-price',
  toVal: 'to-value-price',
  filterBody: '.filter-type-dual-slider-price',
  filterType: 'price',
  sliderColor: '#C1B1AA',
  rangeColor: '#392E2A',
};

const optionsInStock: DualSliderOptions = {
  fromSlider: '.from-slider-instock',
  toSlider: '.to-slider-instock',
  fromVal: '.from-value-instock',
  toVal: '.to-value-instock',
  filterBody: '.filter-type-dual-slider-instock',
  filterType: 'stock',
  sliderColor: '#C1B1AA',
  rangeColor: '#392E2A',
};

const priceSlider: DualSlider = new DualSlider(optionsPrice);
const stockSlider: DualSlider = new DualSlider(optionsInStock);

priceSlider.init();
stockSlider.init();

export { showFilterBtn, priceSlider, stockSlider, checkboxFilterYear, checkboxFilterCategory };
