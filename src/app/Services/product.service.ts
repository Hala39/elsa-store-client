import { Product } from './../Models/Product';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from '../Models/Pagination';
import { map } from 'rxjs/operators';
import { ProductParams } from '../Models/ProductParams';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productParams: ProductParams = new ProductParams();

  baseUrl = environment.ApiUrl + 'product';

  paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();

  productsSource = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSource.asObservable();

  constructor(private apiCaller: HttpClient) { }

  getProducts(productParams: ProductParams) {

    let params = new HttpParams();
    params = params.append('pageNumber', productParams.pageNumber.toString());
    params = params.append('pageSize', productParams.pageSize.toString());

    if (productParams.searchString)
    {
      params = params.append('searchString', productParams.searchString);
    }

    if (productParams.sizeId)
    {
      params = params.append('sizeId', productParams.sizeId.toString());
    }
   
    if (productParams.categoryId)
    {
      params = params.append('categoryId', productParams.categoryId.toString());
    }

    if (productParams.orderBy)
    {
      params = params.append('orderBy', productParams.orderBy);
    }

    return this.apiCaller.get<Product[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        this.productsSource.next(response.body);

        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return this.paginatedResult;

      })
    )

  
  }
 

}
