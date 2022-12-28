// import 'ShopHeader/shop-header';
// import 'Filter/filter';
// import 'View/view';
// import 'Sort/sort';
// import 'ProductGrid/product-grid';
// console.log('Import Shop');


import { arrCards } from "../../data/info"
import { Cards } from './Cards'

const cards = new Cards(arrCards);
cards.render();

const productsView = document.querySelector('.products-view') as HTMLElement;  // .products-list
const btnProductsGrid = document.querySelector('.view__grid') as HTMLElement;
const btnProductsList = document.querySelector('.view__list') as HTMLElement;

btnProductsGrid.addEventListener('click', function() {
  btnProductsGrid.classList.add('active');
  btnProductsList.classList.remove('active');
  productsView.classList.remove('products-list');
  productsView.classList.add('products-grid');
});

btnProductsList.addEventListener('click', function() {
  btnProductsGrid.classList.remove('active');
  btnProductsList.classList.add('active');
  productsView.classList.remove('products-grid');
  productsView.classList.add('products-list');
});

const sortSelect = document.querySelector('.sort__select') as HTMLSelectElement;

sortSelect.addEventListener("change", function() {
  const value = sortSelect.value;
  if (value === 'default') { cards.sort('default') }
  if (value === 'price-increase') { cards.sort('price', 'increase') }
  if (value === 'price-decrease') { cards.sort('price', 'decrease') }
  if (value === 'year') { cards.sort('year') }
  cards.render()
});

const allCheckboxCategory: NodeListOf<Element> = document.querySelectorAll('.checkbox-category');
const arrAllCheckboxCategory: Element[] = Array.from(allCheckboxCategory);

arrAllCheckboxCategory.forEach((checkbox: Element) => {
  checkbox.addEventListener('change', function(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      let value = (event.target as HTMLInputElement).value.toString();
      cards.addCheckedCategory(value);
      cards.createArrFiltered();
      if (cards.getArrCardsFiltered().length === 0) {
        cards.renederNon()
      } else { cards.render() }

    } else {
      let value = (event.target as HTMLInputElement).value.toString();
      cards.delCheckedCategory(value);
      cards.createArrFiltered();
      if (cards.getArrCardsFiltered().length === 0) {
        cards.renederNon()
      } else { cards.render() }
    }
  })
});

const allCheckboxYear: NodeListOf<Element> = document.querySelectorAll('.checkbox-year');
const arrAllCheckboxYear: Element[] = Array.from(allCheckboxYear);

arrAllCheckboxYear.forEach((checkbox: Element) => {
  checkbox.addEventListener('change', function(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      let value = (event.target as HTMLInputElement).value.toString();
      cards.addCheckedYear(value);
      cards.createArrFiltered();
      if (cards.getArrCardsFiltered().length === 0) {
        cards.renederNon()
      } else { cards.render() }

    } else {
      let value = (event.target as HTMLInputElement).value.toString();
      cards.delCheckedYear(value);
      cards.createArrFiltered();
      if (cards.getArrCardsFiltered().length === 0) {
        cards.renederNon()
      } else { cards.render() }
    }
  })
})


// heckbox.addEventListener('change', function(event)
//         {
//             if (event.target.checked) {
//                 alert(`${event.target.value} is checked`);
//             }
//             else {
//                 alert(`${event.target.value} is unchecked`);
//             }
//         });