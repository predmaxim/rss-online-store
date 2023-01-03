import 'ShopHeader/shop-header';
import { ProductView } from './ProductView';
console.log('Import Product');

document.addEventListener("DOMContentLoaded", () => {
  const num: number =  Number(localStorage.getItem('idCard'));
  const productsView = new ProductView(num);
  productsView.fillPage();
});