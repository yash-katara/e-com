import { Component, OnInit } from '@angular/core';
import { login, signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent  implements OnInit{
  showLogin:boolean=true
  authError:string="";
constructor (private user:UserService){}
ngOnInit(): void {
  this.user.userAuthReload();
}
signUp(data:signUp){
// console.warn(data)
this.user.userSignup(data)
}
login(data:login){
  this.user.userLogin(data);
}
openSignUp(){
  this.showLogin=false
}
openLogin(){
this.showLogin=true;
}
}
