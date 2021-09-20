import { ProductService } from 'src/app/Services/product.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ProductParams } from './Models/ProductParams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ELSA';

	productParams: ProductParams = new ProductParams();

  constructor(private primengConfig: PrimeNGConfig, private productService: ProductService) {
    this.primengConfig.ripple = true;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  search(event: string) {
    this.productParams.searchString = event;
    this.productService.getProducts(this.productParams).subscribe();
  }
}
