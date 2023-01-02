import './dual-slider/dual-slider';
import './checkbox/checkboxes';
console.log('Import Filter');

const filterIcon: HTMLDivElement = <HTMLDivElement>document.querySelector('.filter-icon');
const filter: HTMLDivElement = <HTMLDivElement>document.querySelector('.filter-container');

filterIcon.addEventListener('click', (): void => {
  filter.classList.toggle('hide');
  filterIcon.classList.toggle('active');
});

const mql = window.matchMedia('(max-width: 640px)');

if (mql.matches) {
  filterIcon.classList.toggle('hide');
  filter.classList.toggle('hide');
}
