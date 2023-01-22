import arrCards from '../../../data/cardsData';
import Card from '../../../data/Card';

interface CheckboxFilterOptions {
  filterBody: string;
  filterType: string; // filter: keyof ICard;
}

class CheckboxFilter {
  filterBody: HTMLElement;
  filterType: string;
  filteredCards: string[];

  constructor(options: CheckboxFilterOptions) {
    const { filterBody, filterType } = options;
    this.filterBody = <HTMLElement>document.querySelector(filterBody);
    this.filterType = filterType;
    this.filteredCards = [];
  }

  init() {
    const names = arrCards.reduce((acc: (string | number)[], cur: Card): (string | number)[] => {
      if (this.filterType === 'category') acc.push(cur.category);
      if (this.filterType === 'year') acc.push(cur.year);
      return [...new Set(acc)];
    }, []);

    this.render(names);
  }

  genEvent(name: string): void {
    const event = new CustomEvent(`${name}`, {
      bubbles: true,
      detail: { name: this.filterType, values: this.getFilteredCards() },
    });
    dispatchEvent(event);
  }

  getFilteredCards() {
    return this.filteredCards;
  }

  render(names: (string | number)[]) {
    const h5 = document.createElement('h5');
    h5.textContent = this.filterType.replace(this.filterType[0], this.filterType[0].toUpperCase());
    h5.className = 'filter__header os-h5';
    this.filterBody.insertAdjacentElement('afterbegin', h5);

    names.forEach((name) => {
      const item = document.createElement('div');
      item.className = 'filter-type-checkbox__item';

      const checkbox = <HTMLInputElement>document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = `${name}`;
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

      checkbox.onchange = () => this.filter();
    });
  }

  filter() {
    const checkedCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      `.filter-type-checkbox-${this.filterType} .checkbox-${this.filterType}:checked`
    );

    this.filteredCards = [...checkedCheckboxes].map((el: HTMLInputElement) => el.value);
    this.genEvent('checkbox');
  }
}

export { CheckboxFilterOptions, CheckboxFilter };
