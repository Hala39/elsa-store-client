import { BasketItem } from 'src/app/Models/CustomerBasket';
import { PersonalInfo } from './../../Models/PersonalInfo';
import { Address } from './../../Models/Address';
import { OrderService } from './../../Services/order.service';
import { Observable } from 'rxjs';
import { BasketService } from './../../Services/basket.service';
import { Governorate } from './../../Models/Governorate';
import { District } from './../../Models/District';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import governorates from '../../../assets/JSON/governorates.json';
import districts from '../../../assets/JSON/districts.json';

export enum PageNames {
  first,
  second,
  third,
  forth
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

  items: MenuItem[];
  PageNames = PageNames;

  activeIndex = PageNames.first;
  orderItems : BasketItem[];
  total: number;


  constructor(public messageService: MessageService, private fb: FormBuilder, 
    private basketService: BasketService, private orderService: OrderService) {}

  ngOnInit() {
    this.getItems();
    this.initializeItems();
    this.buildForm();
    this.up();
  }

  up() {
    window.scrollTo(0, 0);
  }

  getTotal(items: BasketItem[]) : number {
    var total = items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    return total;
  }

  changeIndex(number: number) {
    switch(number) {
      case 1:
        if (this.personalInfoForm.valid) {
          this.activeIndex++;
          this.up();
        } else {
          this.messageService.add({severity: 'warn', summary: 'Invalid data!', detail: 'Please re-check your data!'});
        }
        break;
      case 2:
        if (this.addressForm.valid) {
          this.activeIndex++;
          this.up();
        } else {
          this.messageService.add({severity: 'warn', summary: 'Invalid data!', detail: 'Please re-check your data!'});
        }
        break;
      default:
        this.activeIndex++;
        this.up();
        break;
    }

  }

    submitted: boolean = false;
    governorates: Governorate[] = governorates;
    districts: District[] = districts;

    personalInfoForm: FormGroup;
    addressForm: FormGroup;

    firstName = new FormControl('', [ Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]);
    lastName = new FormControl('', [ Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]);
    contactPhone = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(8), Validators.minLength(8)]);
    contactEmail = new FormControl('', [Validators.required, Validators.email]);
    selectedGovernorate = new FormControl('', Validators.required);
    selectedDistrict = new FormControl('', Validators.required);
    firstLine = new FormControl('', Validators.required);
    secondLine = new FormControl('', Validators.required);

    buildForm() {
      this.personalInfoForm = this.fb.group({
        firstName: this.firstName,
        lastName: this.lastName,
        contactPhone: this.contactPhone,
        contactEmail: this.contactEmail,
      })

      this.addressForm = this.fb.group({
        selectedGovernorate: this.selectedGovernorate,
        selectedDistrict: this.selectedDistrict,
        firstLine: this.firstLine,
        secondLine: this.secondLine
      })
    }

    selectGovernorate(governorate: Governorate) {
      this.districts = districts;
      this.districts = this.districts.filter(d => d.governorateId === governorate.id || d.inactive === true);
    }

    selectDistrict(district: District) {
      this.governorates = governorates;
      this.governorates = this.governorates.filter(d => d.id === district.governorateId || d.inactive === true);
      this.selectedDistrict.setValue(district);
    }

    initializeItems() {
      this.items = [
        {
          label: 'Personal',
        },
        {
            label: 'Address',
        },
        {
            label: 'Payment',
        },
        {
            label: 'Confirmation',
        }
      ];
      this.districts = districts;
      this.governorates = governorates;
    }

    getItems() {
      this.basketService.orderItemsSource.subscribe(
        res => {
          this.orderItems = res,
          this.total = this.getTotal(res);
        }
      )
    }

    placeOrder() {
      const items = this.orderItems;
      const address: Address = {
        districtId: this.selectedDistrict.value.id,
        governorateId: this.selectedGovernorate.value.id,
        firstLine: this.firstLine.value,
        secondLine: this.secondLine.value
      }

      const personalInfo: PersonalInfo = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        contactEmail: this.contactEmail.value,
        contactPhone: this.contactPhone.value
      }

      this.orderService.placeOrder(personalInfo, address, items);
    }

    back() {
      this.activeIndex--;
    }
}

