import { Color } from "./Color";
import { ColorSize } from "./ColorSize";

export class ProductColor {
    public color: Color;
    public isMain: boolean;
    public url: string;
    public sizeOptions: ColorSize[];
    public quantity: number;
}