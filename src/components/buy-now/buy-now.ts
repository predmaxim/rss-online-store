export class Validation {

  validName(nameCard: string) {
    const arrWords: string[] = nameCard.split(' ');
    const arrWordsWithLength3: string[] = [];
    arrWords.forEach((word) => {
      if (word.length >= 3) {arrWordsWithLength3.push(word)}
    });
    if (arrWords.length < 2 || arrWordsWithLength3.length < 2) {
      alert('Name entered incorrectly. There must be at least two words, each at least 3 characters long.');
      return false
    }
    return true
  }

  valiEmail(emailCard: string) {
    const pattern = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    if (!pattern.test(emailCard)) {
      alert('Email entered incorrectly');
      return false
    }
    return true
  }

  validAddress(addressCard: string) {
    const arrWords: string[] = addressCard.split(' ');
    const arrWordsWithLength5: string[] = [];
    arrWords.forEach((word) => {
      if (word.length >= 5) {arrWordsWithLength5.push(word)}
    });
    if (arrWords.length < 3 || arrWordsWithLength5.length < 3) {
      alert('Address entered incorrectly. There must be at least 3 words, each at least 5 characters long.');
      return false
    }
    return true
  }

  validPhone(phoneCard: string) {
    let arr = phoneCard.split('');
    let arrFalse = [];
    arr.forEach((item) => {
      if(Number.isInteger(item)) { arrFalse.push(item) }
    })
    if (phoneCard.length < 10 || arrFalse.length !== 0) {
      alert('Wrong phone number. Must contain only numbers at least 9 digits and start with +');
      return false
    }
    return true
  }

  validNumCard(numCard: string) {
    if (numCard.length !== 16) {
      alert('Invalid card number. The number must be 16 digits long.')
      return false
    }
    return true
  }

  paymentSystem(numCard: string) {
    const imgBank = <HTMLImageElement>document.querySelector('.img-by-now-bankpassen');
    if (numCard[0] === '4') { imgBank.src = require("Img/visa.png") }
    else if (numCard[0] === '5') { imgBank.src = require("Img/mastercard.png") }
    else if (numCard[0] === '6') { imgBank.src = require("Img/american.png") }
    else { imgBank.src = require("Img/bankpassen-1.png") }
  }

  validThru(thruCard: string) {
    let arr = thruCard.split('/');
    if ((+arr[0] < 0 || +arr[0] > 12) || thruCard.length !== 5) {
      alert('Invalid card expiration date.')
      return false
    }
    return true
  }

  validCvc(cvcCard: string) {
    if ( cvcCard.length < 3 || cvcCard.length < 3 ) {
      alert('Incorrect CVC');
      return false
    }
    return true
  }

}