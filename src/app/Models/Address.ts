import { District } from './District';
import { Governorate } from './Governorate';

export class Address {
    governorateId: number;
    districtId: number;
    firstLine: string;
    secondLine: string;
    district?: District;
    governorate?: Governorate;
}