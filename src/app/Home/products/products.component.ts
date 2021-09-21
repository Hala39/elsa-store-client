import { Observable } from 'rxjs';
import { ProductParams } from './../../Models/ProductParams';
import { Component, Input, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { Pagination } from 'src/app/Models/Pagination';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  pagination: Pagination;

  productParams: ProductParams = new ProductParams();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    this.initializeProducts();
  }

  initializeProducts() {
    this.products$ = this.productService.products$;
  }

  loadProducts() {
    this.productService.getProducts(this.productParams).subscribe(
      res => this.pagination = res.pagination
    );
  }

  resetParams() {
    this.productParams = new ProductParams();
  }

  paginate(event: any) {
    this.productParams.pageNumber = event.page;
    this.loadProducts();
  }

  items: MegaMenuItem[] = [
    {
      label: 'All Categories', icon: 'pi pi-fw pi-th-large',
      items: [
          [
            {
              label: 'Apparel',
              items: [
                  {
                    label: 'Winter',
                    command: () => {
                      this.resetParams();
                      this.productParams.categoryId = 3;
                      this.loadProducts();
                    }
                  }, 
                  {
                    label: 'Summer',
                    command: () => {
                      this.resetParams();
                      this.productParams.categoryId = 5;
                      this.loadProducts();
                    }
                  }, 
                  {
                    label: 'Warm',
                    command: () => {
                      this.resetParams();
                      this.productParams.categoryId = 4;
                      this.loadProducts();
                    }
                  }
              ]
            },
            {
              label: 'Toys',
              items: [
                {
                  label: 'Barbies',
                  command: () => {
                    this.resetParams();
                    this.productParams.categoryId = 2;
                    this.loadProducts();
                  }
                },
                {
                  label: 'Vehicles',
                  command: () => {
                    this.resetParams();
                    this.productParams.categoryId = 1;
                    this.loadProducts();
                  }
                }
              ]
            }
          ]
      ] 
    },
    {
      label: 'Size', 
      icon: 'pi pi-fw pi-filter',
      items: [
          [
              {
                  label: 'Sort',
                  items: [
                    {
                      label: '0 - 3 months',
                    command: () => {
                      this.resetParams();
                      this.productParams.sizeId = 1;
                      this.loadProducts();
                    }
                  }, 
                      {
                        label: '3 - 6 months',
                      command: () => {
                        this.resetParams();
                        this.productParams.sizeId = 2;
                        this.loadProducts();
                      }
                    }, 
                      {
                        label: '6 - 12 months',
                        command: () => {
                          this.resetParams();
                          this.productParams.sizeId = 3;
                          this.loadProducts();
                        }
                      }, 
                      {
                        label: '1 year',
                        command: () => {
                          this.resetParams();
                          this.productParams.sizeId = 4;
                          this.loadProducts();
                        }
                      },
                      {
                        label: '2 years',
                        command: () => {
                          this.resetParams();
                          this.productParams.sizeId = 4;
                          this.loadProducts();
                        }
                      }
                  ]
              }
          ]
      ]
    },
    {
        label: 'Price', icon: 'pi pi-fw pi-sort-alt',
        items: [
            [
                {
                    label: 'Sort',
                    items: [
                        {
                          label: 'High to low', 
                          icon: 'pi pi-fw pi-sort-amount-down-alt',
                          command: () => {
                            this.resetParams();
                            this.productParams.orderBy = 'price_desc';
                            this.loadProducts();
                          }
                        }, 
                        {
                          label: 'Low to high', 
                          icon: 'pi pi-fw pi-sort-amount-up-alt',
                          command: () => {
                            this.resetParams();
                            this.productParams.orderBy = "price";
                            this.loadProducts();
                          }
                        },
                    ]
                }
            ]
        ]
    },
    { 
        label: 'New Arrivals', icon: 'pi pi-fw pi-star-o', command: () => {
          this.resetParams();
          this.productParams.orderBy = 'new';
          this.loadProducts();
        }
    },
    {
      label: 'Reset Filters', icon: 'pi pi-fw pi-refresh', command: () => {
        this.resetParams();
        this.loadProducts();
      }
    }
  ];

}



