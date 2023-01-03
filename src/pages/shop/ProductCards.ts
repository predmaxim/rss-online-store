import Card from '../../data/Card';

class ProductCards {
  arrCards: Card[];
  arrCardsFiltered: Card[];
  arrFiltersCategory: string[];
  arrFiltersYear: string[];

  constructor(arrCards: Card[]) {
    this.arrCards = arrCards;
    this.arrCardsFiltered = [];
    this.arrFiltersCategory = [];
    this.arrFiltersYear = [];
    this.setEvent('filter');
  }

  setEvent(name: string) {
    addEventListener(name, () => console.log(`${name}`));
  }

  generateEvent(name: string): void {
    const event = new CustomEvent(`${name}`, { bubbles: true });
    dispatchEvent(event);
  }

  getArrCardsFiltered() {
    return this.arrCardsFiltered;
  }

  renederNon() {
    const productsView = document.querySelector('.products-view') as HTMLElement; // .products-list

    while (productsView.firstChild) {
      productsView.removeChild(productsView.firstChild);
    }

    const article = document.createElement('div');
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
      const article = document.createElement('div');
      article.className = 'article';
      article.setAttribute('idCard', `${arrShow[i].id}`); // add attribut for each card with string (number of card)
      if (productsView !== null && article !== null) {
        productsView.append(article);
      }

      const articleImg = document.createElement('div');
      articleImg.className = 'article__img';
      if (articleImg !== null) {
        article.append(articleImg);
      }

      const productImg = document.createElement('img');
      productImg.className = 'product-featured-img';

      productImg.addEventListener('click', () => {
        window.location.href = 'product.html';
      })

      const imgImport = await import(`../../assets/img/products/${arrShow[i].images[0]}`);
      productImg.src = imgImport.default;
      articleImg.append(productImg);

      const articleHeader = document.createElement('p');
      articleHeader.className = 'article__header';
      articleHeader.textContent = `${arrShow[i].name}`;
      article.append(articleHeader);

      const articleDescription = document.createElement('p');
      articleDescription.className = 'article__description';
      articleDescription.textContent = `${arrShow[i].year}  ${arrShow[i].description}`;
      article.append(articleDescription);

      const articleButton = document.createElement('button');
      articleButton.className = 'add-to-cart-btn';
      articleButton.setAttribute('idCard', `${arrShow[i].id}`); // add attribut for each card with string (number of card)
      articleButton.textContent = 'Add to cart';
      article.append(articleButton);

      const articlePrice = document.createElement('p');
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
    this.generateEvent('filter');
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

export default ProductCards;
