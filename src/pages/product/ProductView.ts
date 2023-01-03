import Card from "../../data/Card";
import arrCards from "../../data/cardsData";


export class ProductView {
  cardInfo: Card;

  constructor(numId: number) {
    this.cardInfo = arrCards[numId -1]
  }

  fillPage() {
    const spanInfoYear = <HTMLSpanElement>document.querySelector('.product-year-data');
    spanInfoYear.textContent = this.cardInfo.year.toString();

    const spanInfoCategory = <HTMLSpanElement>document.querySelector('.product-category-data');
    spanInfoCategory.textContent = this.cardInfo.category;

    const spanInfoInstock = <HTMLSpanElement>document.querySelector('.product-in-stock-data');
    spanInfoInstock.textContent = this.cardInfo.stock.toString();

    const pInfoDescription = <HTMLElement>document.querySelector('.product-description');
    pInfoDescription.textContent = this.cardInfo.description;


  }
}