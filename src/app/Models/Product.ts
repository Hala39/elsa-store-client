import { Category } from "./Category";
import { ProductColor } from "./ProductColor";

export class Product {
    public id: number;
    public name: string;
    public description: string;
    public mainImageUrl: string;
    public price: number;
    public discount: number;
    public date: Date;
    public colors: ProductColor[];
    public category: Category;
    public quantity?: number;
}