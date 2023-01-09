import Card from '../../data/Card';

type filteredVal = {
  [key: string]: (number | string)[];
};

class ProductCards {
  arrCards: Card[];
  arrCardsFiltered: Card[];
  filteredVal: filteredVal;
  tempFilter: { [key: string]: boolean | undefined } = {
    price: undefined,
    stock: undefined,
    year: undefined,
    category: undefined,
  };

  constructor(arrCards: Card[]) {
    this.arrCards = arrCards;
    this.arrCardsFiltered = this.arrCards;
    this.filteredVal = {};
  }

  genEvent(name: string): void {
    const event = new CustomEvent(`${name}`, {
      bubbles: true,
      detail: { filteredVal: this.filteredVal },
    });
    dispatchEvent(event);
  }

  getArrCardsFiltered() {
    return this.arrCardsFiltered;
  }

  renderNon() {
    const productsView = document.querySelector('.products-view') as HTMLElement; // .products-list

    const noMatches = document.createElement('div');
    noMatches.className = 'no-matches';
    noMatches.textContent = 'No matches';

    const allHidden = () => {
      return [...(document.querySelectorAll(`.products-container .article`) as NodeListOf<HTMLDivElement>)].every(
        (el: HTMLDivElement) => el.classList.contains('dispnone')
      );
    };

    if (allHidden() && !(document.querySelector(`.no-matches`) as HTMLDivElement)) {
      productsView.insertAdjacentElement('afterbegin', noMatches);
    }

    if (!allHidden() && (document.querySelector(`.no-matches`) as HTMLDivElement)) {
      (document.querySelector(`.no-matches`) as HTMLDivElement).remove();
    }
  }

  async render(opt?: 'all') {
    const arrShow: Card[] = opt && opt === 'all' ? this.arrCards.slice() : this.arrCardsFiltered.slice();

    const productsView = document.querySelector('.products-view') as HTMLElement; // .products-list

    while (productsView.firstChild) {
      productsView.removeChild(productsView.firstChild);
    }

    for (let i = 0; i < arrShow.length; i++) {
      const article = document.createElement('div');
      article.className = 'article';
      article.setAttribute('idCard', `${arrShow[i].id}`); // add attribute for each card with string (number of card)
      article.setAttribute('price', `${arrShow[i].price}`);
      article.setAttribute('year', `${arrShow[i].year}`);
      article.setAttribute('category', `${arrShow[i].category}`);
      article.setAttribute('stock', `${arrShow[i].stock}`);

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
      articleButton.setAttribute('idCard', `${arrShow[i].id}`); // add attribute for each card with string (number of card)
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

  filter(filterName: 'price' | 'stock' | 'year' | 'category', values: (number | string)[]): void {
    const isPassed = (card: Card) => {
      if (this.filteredVal.price) {
        if (card.price >= this.filteredVal.price[0] && card.price <= this.filteredVal.price[1]) {
          this.tempFilter.price = true;
        } else this.tempFilter.price = false;
      }

      if (this.filteredVal.stock) {
        if (card.stock >= this.filteredVal.stock[0] && card.stock <= this.filteredVal.stock[1]) {
          this.tempFilter.stock = true;
        } else this.tempFilter.stock = false;
      }

      if (this.filteredVal.year) {
        if (this.filteredVal.year.some((el) => el === String(card.year))) {
          this.tempFilter.year = true;
        } else this.tempFilter.year = false;
      }

      if (this.filteredVal.category) {
        if (this.filteredVal.category.some((el) => el === card.category)) {
          this.tempFilter.category = true;
        } else this.tempFilter.category = false;
      }

      if (
        [this.tempFilter.price, this.tempFilter.stock, this.tempFilter.year, this.tempFilter.category].every(
          (el: boolean | undefined) => el === true || el === undefined
        )
      ) {
        return true;
      }

      return false;
    };

    const showFiltered = () => {
      this.arrCards.forEach((card: Card) => {
        (<HTMLDivElement>document.querySelector(`.article[idcard="${card.id}"]`)).classList.add('dispnone');
      });

      this.arrCardsFiltered.forEach((card: Card) => {
        (<HTMLDivElement>document.querySelector(`.article[idcard="${card.id}"]`)).classList.remove('dispnone');
      });
    };

    if (values.length === 0) {
      delete this.filteredVal[filterName];
      this.tempFilter[filterName] = undefined;
    } else {
      this.filteredVal[filterName] = values;
    }

    this.arrCardsFiltered = this.arrCards.reduce((cards: Card[], card: Card): Card[] => {
      isPassed(card) ? cards.push(card) : false;
      return [...new Set(cards)];
    }, []);

    showFiltered();

    this.renderNon();
    this.genEvent('filter');
  }

  getfilteredVal() {
    return this.filteredVal;
  }

  sort(filter: 'price' | 'year' | 'default', sortDirection?: 'increase' | 'decrease') {
    const main = <HTMLDivElement>document.querySelector('.products-view');

    if (filter === 'default') {
      main.replaceChildren(
        ...Array.from(main.children).sort((a, b) => Number(a.getAttribute('idcard')) - Number(b.getAttribute('idcard')))
      );
    }

    if (filter === 'year') {
      main.replaceChildren(
        ...Array.from(main.children).sort((a, b) => Number(a.getAttribute('year')) - Number(b.getAttribute('year')))
      );
    }

    if (filter === 'price') {
      if (sortDirection === 'increase') {
        main.replaceChildren(
          ...Array.from(main.children).sort((a, b) => Number(a.getAttribute('price')) - Number(b.getAttribute('price')))
        );
      }
      if (sortDirection === 'decrease') {
        main.replaceChildren(
          ...Array.from(main.children).sort((a, b) => Number(b.getAttribute('price')) - Number(a.getAttribute('price')))
        );
      }
    }
  }
}

export { ProductCards };
