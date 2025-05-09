import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage: undefined | string;
constructor(private route:ActivatedRoute , private product: ProductService) { }
ngOnInit(): void {
  let productId = this.route.snapshot.paramMap.get('id');
  console.warn(productId);

  productId && this.product.getProduct(productId).subscribe((data)=>{
    console.warn(data);
    this.productData = data;
    
  })
  
}
submit(data: product) {
  console.warn(data); 
  if(this.productData){
    data.id = this.productData.id
  }
  this.product.updateProduct(data).subscribe((result) => {
    console.warn(result);
    if (result) {
      this.productMessage = 'Product updated successfully';
    }
  }
  , (error) => {
    console.log(error);
  }
  );
  setTimeout(() => {
    this.productMessage = undefined;
  }, 3000);
}
}
