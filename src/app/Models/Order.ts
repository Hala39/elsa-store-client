import { Address } from './Address';
import { PersonalInfo } from './PersonalInfo';

export class Order {
    id?: number;
    personalInfo: PersonalInfo;
    address: Address;
    items: OrderItem[];
    total: number;
    orderedAt?: Date;
}

export class OrderItem {
    public productName: string;
    public price: number;
    public quantity: number;
    public colorName: string;
    public sizeName: string;
    public pictureUrl: string;
}