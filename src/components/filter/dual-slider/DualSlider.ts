type DualSliderOptions = {
  fromSlider: HTMLInputElement;
  toSlider: HTMLInputElement;
  fromVal: HTMLDivElement;
  toVal: HTMLDivElement;
  sliderColor: string;
  rangeColor: string;
  min: number;
  max: number;
};

class DualSlider {
  fromSlider;
  toSlider;
  fromVal;
  toVal;
  sliderColor;
  rangeColor;
  min;
  max;

  constructor(options: DualSliderOptions) {
    const { fromSlider, toSlider, fromVal, toVal, sliderColor, rangeColor, min, max } = options;
    this.fromSlider = fromSlider;
    this.toSlider = toSlider;
    this.fromVal = fromVal;
    this.toVal = toVal;
    this.sliderColor = sliderColor;
    this.rangeColor = rangeColor;
    this.min = min;
    this.max = max;
  }

  start() {
    this.fromSlider.oninput = () => this.controlFromSlider(this.fromSlider, this.toSlider, this.fromVal);
    this.toSlider.oninput = () => this.controlToSlider(this.fromSlider, this.toSlider, this.toVal);

    this.fromSlider.value = String(this.min);
    this.fromSlider.min = String(this.min);
    this.fromSlider.max = String(this.max);

    this.toSlider.value = String(this.max);
    this.toSlider.min = String(this.min);
    this.toSlider.max = String(this.max);

    this.fromVal.textContent = String(this.min);
    this.toVal.textContent = String(this.max);

    this.fillSlider(this.fromSlider, this.toSlider, this.sliderColor, this.rangeColor, this.toSlider);
    this.setToggleAccessible(this.toSlider);

    // this.fromVal.oninput = () => this.controlFromVal(this.fromSlider, this.fromVal, this.toVal, this.toSlider);
    // this.toVal.oninput = () => this.controlToVal(this.toSlider, this.fromVal, this.toVal, this.toSlider);
  }

  controlFromVal(
    fromSlider: HTMLInputElement,
    fromVal: HTMLInputElement,
    toVal: HTMLInputElement,
    controlSlider: HTMLInputElement
  ): void {
    // const [from, to] = this.getParsed(fromVal, toVal);
    const [from, to] = [this.min, this.max];
    this.fillSlider(fromVal, toVal, this.sliderColor, this.rangeColor, controlSlider);
    if (from > to) {
      fromSlider.value = String(to);
      fromVal.value = String(to);
    } else {
      fromSlider.value = String(from);
    }
  }

  controlToVal(
    toSlider: HTMLInputElement,
    fromVal: HTMLInputElement,
    toVal: HTMLInputElement,
    controlSlider: HTMLInputElement
  ): void {
    // const [from, to] = this.getParsed(fromVal, toVal);
    const [from, to] = [this.min, this.max];
    this.fillSlider(fromVal, toVal, this.sliderColor, this.rangeColor, controlSlider);
    this.setToggleAccessible(toVal);
    if (from <= to) {
      toSlider.value = String(to);
      toVal.value = String(to);
    } else {
      toVal.value = String(from);
    }
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
    toVal.textContent = toSlider.value;
    this.fillSlider(fromSlider, toSlider, this.sliderColor, this.rangeColor, toSlider);
    this.setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = String(to);
      toVal.textContent = String(to);
    } else {
      toSlider.value = String(from);
      toVal.textContent = String(from);
    }
  }

  fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement
  ): void {
    const rangeDistance: number = Number(to.max) - Number(to.min);
    const fromPosition: number = Number(from.value) - Number(to.min);
    const toPosition: number = Number(to.value) - Number(to.min);
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
    const from: number = parseInt(currentFrom.value, 10);
    const to: number = parseInt(currentTo.value, 10);
    return [from, to];
  }

  setToggleAccessible(currentTarget: HTMLInputElement): void {
    // const tosSlider: HTMLInputElement = <HTMLInputElement>document.querySelector('.to-slider-instock');
    if (Number(currentTarget.value) <= 0) {
      this.toSlider.style.zIndex = `${2}`;
    } else {
      this.toSlider.style.zIndex = `${0}`;
    }
  }
}

export { DualSliderOptions, DualSlider };
