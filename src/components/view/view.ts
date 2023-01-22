console.log('Import View');

const productsView = document.querySelector('.products-view') as HTMLElement; // .products-list
const btnProductsGrid = document.querySelector('.view__grid') as HTMLElement;
const btnProductsList = document.querySelector('.view__list') as HTMLElement;

btnProductsGrid.addEventListener('click', function () {
  btnProductsGrid.classList.add('active');
  btnProductsList.classList.remove('active');
  productsView.classList.remove('products-list');
  productsView.classList.add('products-grid');
});

btnProductsList.addEventListener('click', function () {
  btnProductsGrid.classList.remove('active');
  btnProductsList.classList.add('active');
  productsView.classList.remove('products-grid');
  productsView.classList.add('products-list');
});
