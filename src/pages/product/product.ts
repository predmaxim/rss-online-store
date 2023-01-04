import 'ShopHeader/shop-header';
import { ProductView } from './ProductView';
console.log('Import Product');

document.addEventListener("DOMContentLoaded", () => {
  const num: number =  Number(localStorage.getItem('idCard'));
  const productsView = new ProductView(num);
  productsView.fillPage();
});

const popUp = <HTMLEmbedElement>document.querySelector('.pop-up-all');
const btnByNow = <HTMLElement>document.querySelector('.buy-now-btn');
btnByNow.addEventListener('click', () => {
  popUp.style.display = 'block';
});

const btnClosePopUp = <HTMLElement>document.querySelector('.close-btn-img');
btnClosePopUp.addEventListener('click', () => {
  popUp.style.display = 'none';
})