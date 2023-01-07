import 'ShopHeader/shop-header';
import { Validation } from '../../components/buy-now/buy-now';
import { ProductView } from './ProductView';
console.log('Import Product');

const validation = new Validation;

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
});

const inputName = <HTMLInputElement>document.querySelector('#input-buy-now-name');
const inputEmail = <HTMLInputElement>document.querySelector('#input-buy-now-email');
const inputAddress = <HTMLInputElement>document.querySelector('#input-buy-now-address');

const inputPhone = <HTMLInputElement>document.querySelector('#input-buy-now-phone');
inputPhone.addEventListener('input', () => {
  if (inputPhone.value[0] !== '+') {
    inputPhone.value = '+' + inputPhone.value;
  }
});

const inputCardNumber = <HTMLInputElement>document.querySelector('#input-buy-now-num-card');
inputCardNumber.addEventListener('input', () => {
  validation.paymentSystem(inputCardNumber.value);
  if (inputCardNumber.value.length > 16) {
    inputCardNumber.value = inputCardNumber.value.slice(0, 16)
  }
})

const inputValidThru = <HTMLInputElement>document.querySelector('#input-buy-now-valid-card');
inputValidThru.addEventListener('input', () => {
  if (inputValidThru.value.length === 2) {
    inputValidThru.value = inputValidThru.value + '/';
  }
  if (inputValidThru.value.length > 5) {
    inputValidThru.value = inputValidThru.value.slice(0, 5);
  }
});

const inputCVC = <HTMLInputElement>document.querySelector('#input-buy-now-cvc-card');
inputCVC.addEventListener('input', () => {
  if (inputCVC.value.length > 3) {
    inputCVC.value = inputCVC.value.slice(0, 3)
  }
})

const form = <HTMLFormElement>document.querySelector('.buy-now-form');
const messageConfirm = <HTMLElement>document.querySelector('.block-confirm-data');
const popUpHeader = <HTMLElement>document.querySelector('.pop-up-heder');

const btnConfirm = <HTMLButtonElement>document.querySelector('.buy-now-confirm-btn');
btnConfirm.addEventListener('click', (event) => {
  console.log(inputPhone.value)
  if (!validation.validName(inputName.value)
      || !validation.valiEmail(inputEmail.value)
      || !validation.validAddress(inputAddress.value)
      || !validation.validPhone(inputPhone.value)
      || !validation.validNumCard(inputCardNumber.value)
      || !validation.validThru(inputValidThru.value)
      || !validation.validCvc(inputCVC.value)) {
    event.preventDefault();
  } else {
    event.preventDefault();
    form.style.display = 'none';
    popUpHeader.style.display = 'none';
    messageConfirm.style.display = 'block';
    setTimeout(() => {
      form.submit()
    }, 3000)
  }
})