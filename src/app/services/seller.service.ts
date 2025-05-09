import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLoggedin = new  BehaviorSubject<boolean>(false);
isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private router: Router) { }
  userSignup(data:signUp){
     this.http.post('http://localhost:3000/seller',data , {observe:'response'}).subscribe((result) => {
      console.log(result);
      if(result) {
        this.isSellerLoggedin.next(true);
        localStorage.setItem('seller', JSON.stringify(result));
        this.router.navigate(['/seller-home']);
      }
     
    }, (error) => {
      console.log(error);
    }
    );
    
  }
  reloadSeller() {
    if(localStorage.getItem('seller')) {
      this.isSellerLoggedin.next(true);
      this.router.navigate(['/seller-home']);
    }
  }
  userLogin(data:login){
console.warn(data); 
this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((result:any) => {
  console.log(result);
  if(result && result.body && result.body.length) {
    console.warn("User logged in successfully");
    this.isSellerLoggedin.next(true);
    localStorage.setItem('seller', JSON.stringify(result));
    //console.warn("local storage", localStorage.getItem('seller'));
    this.router.navigate(['/seller-home']);
  }
  else {
    console.warn("User not found");
    this.isLoginError.emit(true);
  }
}, (error) => {
  console.log(error);
})
}

isloggedin(){
  return this.isSellerLoggedin.value;
}
}


