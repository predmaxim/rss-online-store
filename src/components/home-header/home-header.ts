const navIcon: HTMLDivElement = <HTMLDivElement>document.querySelector('.nav-icon');
const menu: HTMLDivElement = <HTMLDivElement>document.querySelector('.menu');
const menuItems = document.querySelector('.menu__item');

navIcon.addEventListener('click', (): void => {
  menu.classList.toggle('hide');
  navIcon.classList.toggle('active');
});
