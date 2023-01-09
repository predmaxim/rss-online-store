import Card from '../../data/Card';
import arrCards from '../../data/cardsData';

export class ProductView {
  cardInfo: Card;

  constructor(numId: number) {
    this.cardInfo = arrCards[numId - 1];
  }

  async fillPage() {
    const nameInfo = <HTMLElement>document.querySelector('.os-h1');
    nameInfo.textContent = this.cardInfo.name;

    const imgCurrent = <HTMLImageElement>document.querySelector('.product-gallery__cuurent-image-img');
    const imgGallery1 = <HTMLImageElement>document.querySelector('.product-gallery-item-img-1');
    const imgImport1 = await import(`../../assets/img/products/${this.cardInfo.images[0]}`);
    imgGallery1.src = imgImport1.default;
    imgCurrent.src = imgImport1.default;

    const imgGallery2 = <HTMLImageElement>document.querySelector('.product-gallery-item-img-2');
    const imgImport2 = await import(`../../assets/img/products/${this.cardInfo.images[1]}`);
    imgGallery2.src = imgImport2.default;

    const imgGallery3 = <HTMLImageElement>document.querySelector('.product-gallery-item-img-3');
    const imgImport3 = await import(`../../assets/img/products/${this.cardInfo.images[2]}`);
    imgGallery3.src = imgImport3.default;

    const arrGalleryImg: HTMLImageElement[] = Array.from(document.querySelectorAll('.product-gallery-item-img'));
    arrGalleryImg.forEach((img: HTMLImageElement) => {
      img.addEventListener('click', () => {
        imgCurrent.src = img.src;
      });
    });

    const spanInfoYear = <HTMLSpanElement>document.querySelector('.product-year-data');
    spanInfoYear.textContent = this.cardInfo.year.toString();

    const spanInfoCategory = <HTMLSpanElement>document.querySelector('.product-category-data');
    spanInfoCategory.textContent = this.cardInfo.category;

    const spanInfoInstock = <HTMLSpanElement>document.querySelector('.product-in-stock-data');
    spanInfoInstock.textContent = this.cardInfo.stock.toString();

    const pInfoDescription = <HTMLElement>document.querySelector('.product-description');
    pInfoDescription.textContent = this.cardInfo.description;

    const spanInfoPrice = <HTMLSpanElement>document.querySelector('.product-currency-data');
    spanInfoPrice.textContent = this.cardInfo.price.toString();
  }
}
