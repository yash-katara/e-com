import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData : undefined| product;
  productQuantity:number =1;
  quantity:number=1;
  removeCart = false;
  constructor(private activeRoute:ActivatedRoute , private product:ProductService) {}
ngOnInit(): void {
  let productId = this.activeRoute.snapshot.paramMap.get('productId');
  console.warn(productId);
  productId && this.product.getProduct(productId).subscribe((result)=>{
    console.warn(result);
    this.productData= result;


    let cartData = localStorage.getItem('localCart');
    if(productId && cartData){
      let items = JSON.parse(cartData);
 items = items.filter((item:product)=> productId== item.id.toString());
      if(items.length){
        this.removeCart = true;
        console.warn(this.productQuantity);
      }else{
        this.removeCart = false;
      }
  } 
 })
 }
//  handleQuantity(val:string){
// if(this.productQuantity<20 && val=== 'plus')
//   this.productQuantity = +1;
//  } 
//   else if(this.productQuantity >1 && val=== 'minus'){
//   this.productQuantity = -1;

//   }
handleQuantity(val: string) {
  if (val === 'plus' && this.productQuantity < 20) {
    this.productQuantity += 1;
  } else if (val === 'minus' && this.productQuantity > 1) {
    this.productQuantity -= 1;
  }
}
  addToCart(){
    if(this.productData){
      this.productData.quantity =this.productQuantity;
      if(!localStorage.getItem('user')){
        console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        console.warn('product added to cart');
        this.removeCart = true;
      } 
      else{
        console.warn('else');
        
      }
     
      
    }
 }

 removeToCart(productId:number){
this.product.removeItemfromCart(productId);
this.removeCart = false;
}
}

