import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
cartData = new EventEmitter<product[] | []>();
  constructor(private http:HttpClient) { }
  addProduct(data:product){
    console.warn("service called");
    
    return this.http.post('http://localhost:3000/products',data);
  }
  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');   
}
deleteProduct(id:number){
  return this.http.delete<product[]>(`http://localhost:3000/products/${id}`);  
}
getProduct(id:string){
  return this.http.get<product>(`http://localhost:3000/products/${id}`);   
}
updateProduct(product:product){
  return this.http.put<product[]>(`http://localhost:3000/product/${product.id}`,product);  
}
popularProducts() {
  return this.http.get<product[]>('http://localhost:3000/products?_limit=2');
}

trendyProducts() {
  return this.http.get<product[]>('http://localhost:3000/products?_limit=8');

}
searchProduct(query:string){
  return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
}

localAddToCart(data:product){
  let cartData = [];
  let localCart = localStorage.getItem('localCart');
  if(!localCart){
    localStorage.setItem('localCart',JSON.stringify([data]));
    this.cartData.emit([data]);
  }else{      
    cartData = JSON.parse(localCart);
    localStorage.setItem('localCart',JSON.stringify(cartData));
    
    }
    this.cartData.emit(cartData);
  }
  removeItemfromCart(productId:number){
let cartData = localStorage.getItem('localCart');
if(cartData){
  let items :product[] = JSON.parse(cartData);
  items = items.filter((item:product)=> productId !== item.id);
  console.warn(items);
  localStorage.setItem('localCart',JSON.stringify(items));
  this.cartData.emit(items); 
  }
}
}
