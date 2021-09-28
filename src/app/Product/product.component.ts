import { BasketItem } from './../Models/CustomerBasket';
import { MessageService } from 'primeng/api';
import { BasketService } from './../Services/basket.service';
import { ColorService } from './../Services/color.service';
import { Component, OnInit } from '@angular/core';
import { ProductColor } from '../Models/ProductColor';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Models/Product';
import { Color } from '../Models/Color';
import { ColorSize } from '../Models/ColorSize';
import { Size } from '../Models/Size';
import { of } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit {

  productId = +this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private colorService: ColorService, private messageService: MessageService,
    private activatedRoute: ActivatedRoute, private basketService: BasketService, private router: Router) {
    this.loadProduct();

  }
 
  product: Product;
  sizes: ColorSize[] = [];
  productColors: ProductColor[];
  colors : Color[] = [];
  quantity: number = 1;
  selectedColor: Color = null;
  selectedSize: Size = null;
  max: number = 1;

  ngOnInit() {
    this.initializeDropdowns();
    window.scrollTo(0,0);
  }

  loadProduct() {
    if (this.product) {
      of(this.product);
    }

    this.colorService.getProductById(this.productId).subscribe(
      response => {
        if (response) {
          this.product = response;
          this.productColors = response.colors;
          this.productColors.forEach(element => {
            this.colors.push(element.color);
          });

        }
      }, error => {
        console.log(error);
      }
    )
  }

  selectColor(color: any) {
    const selected = this.productColors.find(pc => pc.color.name === color);
    if (selected) {
      this.sizes = this.sizes.concat(selected.sizeOptions);
      this.product.mainImageUrl = selected.url;
      this.max = selected.quantity;
    }
  }

  selectSize(size: any) {
    if (this.selectedSize !== null)
    {
      this.max = this.sizes.find(cs => cs.size.name === size).quantity;

    }
  }

  initializeDropdowns() {
    this.colors = [
      { id: 0, name: "Color", inactive: true }
    ]

    this.sizes = [
      {
        size: {
          id: 0, name: "Size", inactive: true
        },
        quantity: 20
      }
    ]
  }

  addToBasket() {
    if (this.selectColor === null) {
      this.messageService.add({severity: "warn", summary: 'Missing Information', detail: "Please choose a color!"});
    } else if ( this.selectedSize === null) {
      this.messageService.add({severity: "warn", summary: 'Missing Information', detail: "Please choose a size!"});
    } else {
      return this.basketService.addItemToBasket(this.product, this.quantity, this.selectedSize, this.selectedColor, this.product.mainImageUrl);
    }
  }

  buyItNow() {
    if (this.selectColor === null) {
      this.messageService.add({severity: "warn", summary: 'Missing Information', detail: "Please choose a color!"});
    } else if ( this.selectedSize === null) {
      this.messageService.add({severity: "warn", summary: 'Missing Information', detail: "Please choose a size!"});
    } else {
      const item = this.basketService.mapProductItemToBasketItem(this.product, this.quantity, this.selectedSize, this.selectedColor, this.product.mainImageUrl);
      const items: BasketItem[] = [item];
      this.basketService.orderItemsSource.next(items);
      this.router.navigateByUrl("/order/place");
    }
  }

}
 