export class BasketItem {
    public id?: number;
    public productName: string;
    public price: number;
    public quantity: number;
    public colorName: string;
    public sizeName: string;
    public pictureUrl: string;
    public total?: number;

}



export class BasketTotals {
    public shipping: number;
    public subtotal: number;
    public total: number;
}

