import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
constructor(private seller:SellerService , private router:Router) { }
showLogin = false;
authError:string= '';
  ngOnInit(): void {
this.seller.reloadSeller();
  }
  signUp(data:signUp) {
    console.log(data);
    this.seller.userSignup(data)
}
login(data:signUp) {
  this
 // console.log(data);
 this.seller.userLogin(data);
 this.seller.isLoginError.subscribe((isError) => {
  if(isError) {
    console.warn("Email or Password is incorrect");
    this.authError = 'Email or Password is incorrect';
  }
 })
  
}

openLogin(){
this.showLogin=true;
}
opensignup(){
  this.showLogin=false;
}
}