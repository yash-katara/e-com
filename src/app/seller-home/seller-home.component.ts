import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList: undefined | product[];
  deleteMessage: undefined | string;
  icon = faTrash;
  editIcon = faEdit;
constructor(private product:ProductService) { }
ngOnInit(): void {
  this.product.productList().subscribe((result) => {
    console.warn(result);
    this.productList = result;
  }
  , (error) => {
    console.log(error);
  }
  );
}
deleteproduct(id: number) {
  console.warn('id', id);
  this.product.deleteProduct(id).subscribe((result) => {
    console.warn(result);
    if (result) {
      this.productList = this.productList?.filter((item) => item.id !== id);
       this.deleteMessage = 'Product deleted successfully';
      setTimeout(() => {
        this.deleteMessage = undefined;
      }, 3000);
    }
  }
  , (error) => {
    console.log(error);
  }
  );
  
}
}

