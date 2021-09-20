import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../Models/Product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  baseUrl = environment.ApiUrl;

  product: Product;

  constructor(private apiCaller: HttpClient) { }

  getProductById(id: number) {  
    return this.apiCaller.get<Product>(this.baseUrl + 'product/' + id.toString()).pipe(
      map(response => {
        this.product = response;
        return response;
      })
    );
  }
  
}
