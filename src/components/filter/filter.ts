import { DualSliderOptions, DualSlider } from './dual-slider/DualSlider';
import { CheckboxFilterOptions, CheckboxFilter } from './checkbox/CheckboxFilter';
import { matchMediaQueries } from '../base/base';
import cards from '../product-grid/product-grid';

console.log('Import Filter');

// Mobile filter button
const showFilterBtn = (): void => {
  const filterIcon = <HTMLDivElement>document.querySelector('.filter-icon');
  const filter = <HTMLDivElement>document.querySelector('.filter-container');

  filterIcon.classList.toggle('hide');
  filter.classList.toggle('hide');

  filterIcon.addEventListener('click', (): void => {
    filter.classList.toggle('hide');
    filterIcon.classList.toggle('active');
  });
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

if (matchMediaQueries('max', '640px')) showFilterBtn();

function applyFilter(e: CustomEvent): void {
  cards.filter(e.detail.name, e.detail.values);
}

function filtersQty() {
  const qty = <HTMLDivElement>document.querySelector('.products__qty');
  const qtyElem = <HTMLDivElement>document.querySelector('.filtered');

  qtyElem.classList.remove('hide');
  qty.textContent = String(cards.arrCardsFiltered.length);
}

function clearFilter(e: MouseEvent): void {
  e.preventDefault();
  const checkboxes = <NodeListOf<HTMLInputElement>>(
    document.querySelectorAll(`.filter-container__body .filter-type-checkbox__checkbox`)
  );

  [...checkboxes].forEach((el: HTMLInputElement) => (el.checked = false));

  priceSlider.setValue();
  stockSlider.setValue();
  priceSlider.setFillSlider();
  stockSlider.setFillSlider();

  cards.filter('price', []);
  cards.filter('stock', []);
  cards.filter('year', []);
  cards.filter('category', []);
}

filtersQty();
addEventListener('dual-slider', ((e: CustomEvent) => applyFilter(e)) as EventListener);
addEventListener('checkbox', ((e: CustomEvent) => applyFilter(e)) as EventListener);
addEventListener('filter', (() => filtersQty()) as EventListener);
(<HTMLDivElement>document.querySelector('.clear-filter')).addEventListener('click', ((e: MouseEvent) =>
  clearFilter(e)) as EventListener);

export { priceSlider, stockSlider, checkboxFilterYear, checkboxFilterCategory };
