import { Card } from '../../data/Card';
import { arrCards } from "../../data/info"

export class Cards {
  arrCards: Card[];
  arrCardsFiltered: Card[];

  constructor(arrCards: Card[]) {
    this.arrCards = arrCards;
    this.arrCardsFiltered = []
  }

  render() {
    let arrShow: Card[];
    if (this.arrCardsFiltered.length === 0) {
      arrShow = this.arrCards;
    } else {
      arrShow = this.arrCardsFiltered
    }

    const productsView = document.querySelector('.products-view') as HTMLElement;  // .products-list

    while (productsView.firstChild) {
      productsView.removeChild(productsView.firstChild);
    }

    for(let i = 0; i < arrShow.length; i ++) {

      const article = document.createElement('div') as HTMLDivElement;
      article.className = 'article';
      article.setAttribute('idCard', `${arrCards[i].id}`); // add attribut for each card with string (number of card)
      if (productsView !== null && article !== null) {
        productsView.append(article);
      }

      const articleImg = document.createElement('div') as HTMLDivElement;
      articleImg.className = 'article__img';
      if (articleImg !== null) {
        article.append(articleImg);
      }

      const productImg = document.createElement('img') as HTMLImageElement;
      productImg.className = 'product-featured-img';
      // productImg.src = require(`Img/products/${i + 1}-1.jpg`)
      productImg.src = `Img/products/${i + 1}-1.jpg`; //????????????????????????????
      if (productImg !== null) {
        articleImg.append(productImg);
      }

      const articleHeader = document.createElement('p') as HTMLElement;
      articleHeader.className = 'article__header';
      articleHeader.textContent = `${arrCards[i].name}`
      article.append(articleHeader);

      const articleDescription = document.createElement('p') as HTMLElement;
      articleDescription.className = 'article__description';
      articleDescription.textContent = `${arrCards[i].description}`
      article.append(articleDescription);

      const articleButton = document.createElement('button') as HTMLButtonElement;
      articleButton.className = 'add-to-cart-btn';
      articleButton.setAttribute('idCard', `${arrCards[i].id}`); // add attribut for each card with string (number of card)
      articleButton.textContent = 'Add to cart'
      article.append(articleButton);

      const articlePrice = document.createElement('p') as HTMLElement;
      articlePrice.className = 'article__price';
      articlePrice.textContent = `${arrCards[i].price}`
      article.append(articlePrice);

      const articlePriceCurrency = document.createElement('span');
      articlePriceCurrency.className  = 'price-currency';
      articlePriceCurrency.textContent = '€';
      articlePrice.prepend(articlePriceCurrency);

    }
  }

  addChecked(filterItem: string | number) {
    let arrResult: Card[] = this.arrCards.filter((item: Card) => item.year === filterItem
    || item.category === filterItem);
    arrResult.forEach((card: Card) => this.arrCardsFiltered.push(card));
    return this.arrCardsFiltered
  }

  delChecked(filterItem: string | number) {
    this.arrCardsFiltered = this.arrCardsFiltered.filter((item: Card) => item.year !== filterItem
    && item.category !== filterItem);
    return this.arrCardsFiltered
  }

  addRange(filter: 'price' | 'stock', min: number, max: number) {
    if (this.arrCardsFiltered.length === 0) {
      this.arrCardsFiltered = this.arrCards.filter((item: Card) => item[filter] >= min && item[filter] <= max)
    } else {
      this.arrCardsFiltered = this.arrCardsFiltered.filter((item: Card) => item[filter] >= min && item[filter] <= max)
    }
  }

  sort(filter: 'price' | 'year' | 'default', sortDirection?: 'increase' | 'decrease') {
    if (this.arrCardsFiltered.length === 0) {this.arrCardsFiltered = this.arrCards}
    if (filter === 'default') {
      this.arrCardsFiltered.sort((a: Card, b: Card) => {
        return a.id - b.id;
      })
    }
    if (filter === 'year') {
      this.arrCardsFiltered.sort((a: Card, b: Card) => {
        return a.year - b.year;
      })
    }
    if (filter === 'price') {
      if (sortDirection === 'increase') {
        this.arrCardsFiltered.sort((a: Card, b: Card) => {
          return a.price - b.price;
        })
      }
      if (sortDirection === 'decrease') {
        this.arrCardsFiltered.sort((a: Card, b: Card) => {
          return b.price - a.price;
        })
      }
    }
  }

}