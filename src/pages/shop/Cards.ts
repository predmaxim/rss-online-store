import { Card } from '../../data/Card';
// import { arrCards } from "../../data/info"

export class Cards {
  arrCards: Card[];
  arrCardsFiltered: Card[];
  arrFiltersCategory: string[];
  arrFiltersYear: string[];

  constructor(arrCards: Card[]) {
    this.arrCards = arrCards;
    this.arrCardsFiltered = [];
    this.arrFiltersCategory = [];
    this.arrFiltersYear = [];
  }

  getArrCardsFiltered() {
    return this.arrCardsFiltered;
  }

  renederNon() {
    const productsView = document.querySelector('.products-view') as HTMLElement; // .products-list

    while (productsView.firstChild) {
      productsView.removeChild(productsView.firstChild);
    }

    const article = document.createElement('div') as HTMLDivElement;
    article.className = 'article';
    article.textContent = 'No matches';
    if (productsView !== null && article !== null) {
      productsView.append(article);
    }
  }

  async render() {
    let arrShow: Card[];

    if (this.arrCardsFiltered.length === 0) {
      arrShow = this.arrCards;
    } else {
      arrShow = this.arrCardsFiltered;
    }

    const productsView = document.querySelector('.products-view') as HTMLElement; // .products-list

    while (productsView.firstChild) {
      productsView.removeChild(productsView.firstChild);
    }

    for (let i = 0; i < arrShow.length; i++) {
      const article = document.createElement('div') as HTMLDivElement;
      article.className = 'article';
      article.setAttribute('idCard', `${arrShow[i].id}`); // add attribut for each card with string (number of card)
      if (productsView !== null && article !== null) {
        productsView.append(article);
      }

      const articleImg = document.createElement('div') as HTMLDivElement;
      articleImg.className = 'article__img';
      if (articleImg !== null) {
        article.append(articleImg);
      }

      // const productImg = new Image();
      const productImg = document.createElement('img') as HTMLImageElement;
      productImg.className = 'product-featured-img';

      const imgImport = await import(`../../assets/img/products/${arrShow[i].images[0]}`);
      productImg.src = imgImport.default;

      if (productImg !== null) {
        articleImg.append(productImg);
      }

      const articleHeader = document.createElement('p') as HTMLElement;
      articleHeader.className = 'article__header';
      articleHeader.textContent = `${arrShow[i].name}`;
      article.append(articleHeader);

      const articleDescription = document.createElement('p') as HTMLElement;
      articleDescription.className = 'article__description';
      articleDescription.textContent = `${arrShow[i].year}  ${arrShow[i].description}`;
      article.append(articleDescription);

      const articleButton = document.createElement('button') as HTMLButtonElement;
      articleButton.className = 'add-to-cart-btn';
      articleButton.setAttribute('idCard', `${arrShow[i].id}`); // add attribut for each card with string (number of card)
      articleButton.textContent = 'Add to cart';
      article.append(articleButton);

      const articlePrice = document.createElement('p') as HTMLElement;
      articlePrice.className = 'article__price';
      articlePrice.textContent = `${arrShow[i].price}`;
      article.append(articlePrice);

      const articlePriceCurrency = document.createElement('span');
      articlePriceCurrency.className = 'price-currency';
      articlePriceCurrency.textContent = '€';
      articlePrice.prepend(articlePriceCurrency);
    }
  }

  createArrFiltered() {
    this.arrCardsFiltered = [];
    if (this.arrFiltersCategory.length === 0 && this.arrFiltersYear.length === 0) {
      this.arrCardsFiltered = this.arrCards;
    } else if (this.arrFiltersCategory.length === 0) {
      this.arrFiltersYear.forEach((year: string) => {
        this.arrCards.forEach((card: Card) => {
          if (card.year.toString() === year) {
            this.arrCardsFiltered.push(card);
          }
        });
      });
    } else if (this.arrFiltersYear.length === 0) {
      this.arrFiltersCategory.forEach((category: string) => {
        this.arrCards.forEach((card: Card) => {
          if (card.category === category) {
            this.arrCardsFiltered.push(card);
          }
        });
      });
    } else {
      const arr: Card[] = [];
      this.arrFiltersCategory.forEach((category: string) => {
        this.arrCards.forEach((card: Card) => {
          if (card.category === category) {
            arr.push(card);
          }
        });
      });
      this.arrFiltersYear.forEach((year: string) => {
        arr.forEach((card: Card) => {
          if (card.year.toString() === year) {
            this.arrCardsFiltered.push(card);
          }
        });
      });
    }
  }

  addCheckedCategory(filterItem: string) {
    this.arrFiltersCategory.push(filterItem);
  }

  addCheckedYear(filterItem: string) {
    this.arrFiltersYear.push(filterItem);
  }

  delCheckedCategory(filterItem: string) {
    this.arrFiltersCategory = this.arrFiltersCategory.filter((s: string) => s !== filterItem);
  }

  delCheckedYear(filterItem: string) {
    this.arrFiltersYear = this.arrFiltersYear.filter((s: string) => s !== filterItem);
  }

  addRange(filter: 'price' | 'stock', min: number, max: number) {
    if (this.arrCardsFiltered.length === 0) {
      this.arrCardsFiltered = this.arrCards.filter((item: Card) => item[filter] >= min && item[filter] <= max);
    } else {
      this.arrCardsFiltered = this.arrCardsFiltered.filter((item: Card) => item[filter] >= min && item[filter] <= max);
    }
  }

  sort(filter: 'price' | 'year' | 'default', sortDirection?: 'increase' | 'decrease') {
    if (this.arrCardsFiltered.length === 0) {
      this.arrCardsFiltered = this.arrCards;
    }
    if (filter === 'default') {
      this.arrCardsFiltered.sort((a: Card, b: Card) => {
        return a.id - b.id;
      });
    }
    if (filter === 'year') {
      this.arrCardsFiltered.sort((a: Card, b: Card) => {
        return a.year - b.year;
      });
    }
    if (filter === 'price') {
      if (sortDirection === 'increase') {
        this.arrCardsFiltered.sort((a: Card, b: Card) => {
          return a.price - b.price;
        });
      }
      if (sortDirection === 'decrease') {
        this.arrCardsFiltered.sort((a: Card, b: Card) => {
          return b.price - a.price;
        });
      }
    }
  }
}
