const navIcon: HTMLDivElement = <HTMLDivElement>document.querySelector('.nav-icon');
const menu: HTMLDivElement = <HTMLDivElement>document.querySelector('.menu');
const menuItems: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.menu__item');

function activeItem(itemList: NodeListOf<HTMLAnchorElement>): void {
  [...itemList].forEach((el) => {
    el.href === window.location.href ? el.classList.toggle('active') : false;
  });
}

navIcon.addEventListener('click', (): void => {
  menu.classList.toggle('hide');
  navIcon.classList.toggle('active');
});

activeItem(menuItems);

export { activeItem };
