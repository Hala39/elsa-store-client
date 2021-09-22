import { MessageService } from 'primeng/api';
import { ProductParams } from './../../Models/ProductParams';
import { ProductService } from 'src/app/Services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  products: Product[] = [];
	productParams: ProductParams = new ProductParams();
	responsiveOptions: any;

	constructor(private productService: ProductService, private messageService: MessageService) { 
		this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
      
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
      
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
	}

	ngOnInit() {
		this.loadProducts(); 
  }

  loadProducts() {
    this.productService.getProducts(this.productParams).subscribe(response => {
      this.products = response.result;
    })
  }

  favorite() {
    this.messageService.add({severity: 'info', summary: 'This feature is not available at this moment!', detail: 'Do not worry! Will be added soon!', life: 5000});
  }

}
