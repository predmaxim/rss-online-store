import cards from '../product-grid/product-grid';
console.log('Import Sort');

const sortSelect = document.querySelector('.sort__select') as HTMLSelectElement;

sortSelect.addEventListener('change', function () {
  const value = sortSelect.value;
  if (value === 'default') cards.sort('default');
  if (value === 'price-increase') cards.sort('price', 'increase');
  if (value === 'price-decrease') cards.sort('price', 'decrease');
  if (value === 'year') cards.sort('year');
});
