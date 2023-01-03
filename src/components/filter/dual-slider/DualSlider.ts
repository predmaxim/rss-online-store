import Card from '../../../data/Card';
import arrCards from '../../../data/cardsData';

interface DualSliderOptions {
  fromSlider: string;
  toSlider: string;
  fromVal: string;
  toVal: string;
  filterBody: string;
  filterType: string;
  sliderColor: string;
  rangeColor: string;
}

class DualSlider {
  fromSlider;
  toSlider;
  fromVal;
  toVal;
  filterBody;
  filterType;
  sliderColor;
  rangeColor;
  min = 0;
  max = 0;
  sliderValues = [];

  constructor(options: DualSliderOptions) {
    const { fromSlider, toSlider, fromVal, toVal, filterBody, filterType, sliderColor, rangeColor } = options;
    this.fromSlider = document.createElement('input');
    this.fromSlider.className = `dual-range-slider ${fromSlider}`;
    this.fromSlider.type = 'range';
    this.toSlider = document.createElement('input');
    this.toSlider.className = `dual-range-slider ${toSlider}`;
    this.toSlider.type = 'range';
    this.fromVal = document.createElement('div');
    this.fromVal.className = `${fromVal}`;
    this.toVal = document.createElement('div');
    this.toVal.className = `${toVal}`;
    this.filterBody = <HTMLElement>document.querySelector(filterBody);
    this.filterType = filterType;
    this.sliderColor = sliderColor;
    this.rangeColor = rangeColor;
  }

  init(): void {
    this.setMinMax(arrCards);
    this.render();
  }

  getMinMax(arr: Card[]): number[] {
    return arr.reduce((acc: number[], cur: Card): number[] => {
      //! FIXME: more universal - acc.push(cur[this.filterType]);

      if (this.filterType === 'price') acc.push(cur.price);
      if (this.filterType === 'stock') acc.push(cur.stock);
      return [Math.min(...acc), Math.max(...acc)];
    }, []);
  }

  setMinMax(arr: Card[]): void {
    [this.min, this.max] = this.getMinMax(arr);

    this.fromSlider.min = String(this.min);
    this.fromSlider.max = String(this.max);

    this.toSlider.min = String(this.min);
    this.toSlider.max = String(this.max);

    this.fromSlider.value = String(this.min);
    this.toSlider.value = String(this.max);

    this.fromVal.textContent = String(this.min);
    this.toVal.textContent = String(this.max);
  }

  render(): void {
    const h5 = document.createElement('h5');
    h5.textContent = this.filterType.replace(this.filterType[0], this.filterType[0].toUpperCase());
    h5.className = 'filter__header os-h5';
    this.filterBody.insertAdjacentElement('afterbegin', h5);

    const rangeContainer = document.createElement('div');
    rangeContainer.className = `range-container range-container-${this.filterType}`;

    const slidersControl = document.createElement('div');
    slidersControl.className = `sliders-control`;

    const sliderValueContainer = document.createElement('div');
    sliderValueContainer.className = `slider-value-container`;

    slidersControl.insertAdjacentElement('afterbegin', this.fromSlider);
    slidersControl.insertAdjacentElement('beforeend', this.toSlider);
    rangeContainer.insertAdjacentElement('afterbegin', slidersControl);

    sliderValueContainer.insertAdjacentElement('afterbegin', this.fromVal);
    sliderValueContainer.insertAdjacentElement('beforeend', this.toVal);
    rangeContainer.insertAdjacentElement('beforeend', sliderValueContainer);

    this.filterBody.insertAdjacentElement('beforeend', rangeContainer);

    this.fromSlider.value = String(this.min);
    this.toSlider.value = String(this.max);

    this.fromVal.textContent = String(this.min);
    this.toVal.textContent = String(this.max);

    this.fillSlider(this.fromSlider, this.toSlider, this.sliderColor, this.rangeColor, this.toSlider);
    this.setToggleAccessible(this.toSlider);

    this.fromSlider.oninput = () => this.controlFromSlider(this.fromSlider, this.toSlider, this.fromVal);
    this.toSlider.oninput = () => this.controlToSlider(this.fromSlider, this.toSlider, this.toVal);
  }

  controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromVal: HTMLDivElement): void {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    // const [from, to] = [this.min, this.max];
    fromVal.textContent = fromSlider.value;
    this.fillSlider(fromSlider, toSlider, this.sliderColor, this.rangeColor, toSlider);
    if (from > to) {
      fromSlider.value = String(to);
      fromVal.textContent = String(to);
    } else {
      fromVal.textContent = String(from);
    }
  }

  controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toVal: HTMLDivElement): void {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    // const [from, to] = [this.min, this.max];
    this.fillSlider(fromSlider, toSlider, this.sliderColor, this.rangeColor, toSlider);
    this.setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = String(to);
      toVal.textContent = String(to);
    } else {
      toVal.textContent = String(from);
      toSlider.value = String(from);
    }
  }

  fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement
  ): void {
    const rangeDistance = Number(to.max) - Number(to.min);
    const fromPosition = Number(from.value) - Number(to.min);
    const toPosition = Number(to.value) - Number(to.min);
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} 100%)`;
  }

  getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement): number[] {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  setToggleAccessible(currentTarget: HTMLInputElement): void {
    // const toSlider: HTMLInputElement = <HTMLInputElement>document.querySelector(`.to-slider-${this.filterType}`);
    if (Number(currentTarget.value) <= 0) {
      this.toSlider.style.zIndex = `${2}`;
      // this.fromSlider.style.zIndex = `${0}`;
    } else {
      this.fromSlider.style.zIndex = `${2}`;
      this.toSlider.style.zIndex = `${0}`;
    }
  }
}

export { DualSliderOptions, DualSlider };
