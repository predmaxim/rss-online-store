import cards from '../../../pages/shop/shop';
import arrCards from '../../../data/cardsData';
import Card from '../../../data/Card';

interface CheckboxFilterOptions {
  filterBody: string;
  filterType: string; // filter: keyof ICard;
}

class CheckboxFilter {
  filterBody;
  filterType;

  constructor(options: CheckboxFilterOptions) {
    const { filterBody, filterType } = options;
    this.filterBody = <HTMLElement>document.querySelector(`.${filterBody}`);
    this.filterType = filterType;
  }

  init() {
    const names = arrCards.reduce((acc: (string | number)[], cur: Card): (string | number)[] => {
      //! FIXME: more universal - acc.push(cur[this.filterType]);

      if (this.filterType === 'category') acc.push(cur.category);
      if (this.filterType === 'year') acc.push(cur.year);
      return [...new Set(acc)];
    }, []);
    this.render(names);
  }

  render(names: (string | number)[]) {
    const h5 = document.createElement('h5');
    h5.textContent = this.filterType.replace(this.filterType[0], this.filterType[0].toUpperCase());
    h5.className = 'filter__header os-h5';
    this.filterBody.insertAdjacentElement('afterbegin', h5);

    names.forEach((name) => {
      const item = document.createElement('div');
      item.className = 'filter-type-checkbox__item ';

      const checkbox = <HTMLInputElement>document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = `checkbox-${name}`;
      checkbox.id = `checkbox-${name}`;
      checkbox.value = `${name}`;
      checkbox.className = `filter-type-checkbox__checkbox checkbox-${this.filterType}`;

      const label = document.createElement('label');
      label.className = 'checkbox__label';
      label.setAttribute('for', checkbox.id);
      label.textContent = `${name}`;

      item.insertAdjacentElement('beforeend', checkbox);
      item.insertAdjacentElement('beforeend', label);
      this.filterBody.insertAdjacentElement('beforeend', item);
      // console.log(...[checkbox, label]);
    });
    this.filter();
  }

  filter() {
    //! FIXME: make more universal
    // const allCheckboxes: Element[] = [...this.filterBody.querySelectorAll(`.checkbox-${this.filterType}`)];

    if (this.filterType === 'year') {
      const allCheckboxYear: NodeListOf<Element> = document.querySelectorAll('.checkbox-year');
      const arrAllCheckboxYear: Element[] = Array.from(allCheckboxYear);

      arrAllCheckboxYear.forEach((checkbox: Element) => {
        checkbox.addEventListener('change', function (event: Event) {
          if ((event.target as HTMLInputElement).checked) {
            const value = (event.target as HTMLInputElement).value.toString();
            cards.addCheckedYear(value);
            cards.createArrFiltered();
            if (cards.getArrCardsFiltered().length === 0) {
              cards.renederNon();
            } else {
              cards.render();
            }
          } else {
            const value = (event.target as HTMLInputElement).value.toString();
            cards.delCheckedYear(value);
            cards.createArrFiltered();
            if (cards.getArrCardsFiltered().length === 0) {
              cards.renederNon();
            } else {
              cards.render();
            }
          }
        });
      });
    }

    if (this.filterType === 'category') {
      const allCheckboxCategory: NodeListOf<Element> = document.querySelectorAll('.checkbox-category');
      const arrAllCheckboxCategory: Element[] = Array.from(allCheckboxCategory);

      arrAllCheckboxCategory.forEach((checkbox: Element) => {
        checkbox.addEventListener('change', function (event: Event) {
          if ((event.target as HTMLInputElement).checked) {
            const value = (event.target as HTMLInputElement).value.toString();
            cards.addCheckedCategory(value);
            cards.createArrFiltered();
            if (cards.getArrCardsFiltered().length === 0) {
              cards.renederNon();
            } else {
              cards.render();
            }
          } else {
            const value = (event.target as HTMLInputElement).value.toString();
            cards.delCheckedCategory(value);
            cards.createArrFiltered();
            if (cards.getArrCardsFiltered().length === 0) {
              cards.renederNon();
            } else {
              cards.render();
            }
          }
        });
      });
    }
  }
}

export { CheckboxFilterOptions, CheckboxFilter };
