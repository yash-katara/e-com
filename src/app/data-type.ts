export interface signUp {
    name: String;
    email: String;
    password: String;
  }

  export interface login {
   
    email: String;
    password: String;
  }

  export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number,
    quantity:undefined | number,
    productId:undefined|number
  }