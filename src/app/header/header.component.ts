import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType:string = 'default';
  sellerName:string = '';
  userName:string='';
  searchResult:undefined | any[];
  cartItems = 0;
constructor(private router: Router , private product :ProductService) { }
ngOnInit(): void {
  this.router.events.subscribe((val:any) => {
    if(val.url){
      console.warn(val.url)
      if(localStorage.getItem('seller') && val.url.includes('seller')) {
       // this.router.navigate(['/']);
       console.warn("in seller");
       this.menuType = 'seller';
       if(localStorage.getItem('seller')) {
        let sellerstore = localStorage.getItem('seller');
        let sellerd = sellerstore && JSON.parse(sellerstore);
        this.sellerName = sellerd.name
        console.warn("seller name", this.sellerName);
       } 
      }else if (localStorage.getItem('user')){
      let userStore = localStorage.getItem('user');
      let userd = userStore && JSON.parse(userStore)
this.userName = userd.name;
this.menuType = 'user'
 
      } 
      else{
        
        this.menuType = 'default';
      }
    }
  });
  let cartData = localStorage.getItem('localCart');
  if(cartData){
    this.cartItems = JSON.parse(cartData).length;
    console.warn(this.cartItems);
  }
  this.product.cartData.subscribe((items) => {
    this.cartItems = items.length;
  })
}
logout() {
  localStorage.removeItem('seller');
  this.router.navigate(['/']);
  this.menuType = 'default';
}
userLogout(){
  localStorage.removeItem('user');
  this.router.navigate(['/user-auth']);
  this.menuType = 'user';
}
searchProduct(query:KeyboardEvent) {
  if(query){
    const element = query.target as HTMLInputElement;
    this.product.searchProduct(element.value).subscribe((result) => {
     
      this.searchResult = result;
      console.warn("search result", this.searchResult);
    })
  }
}
hideSearch() {
  this.searchResult = undefined;
 
}
submitsearch(val:string){
  console.warn(val);
  this.router.navigate(['search/$(val)'])
  

}
}
