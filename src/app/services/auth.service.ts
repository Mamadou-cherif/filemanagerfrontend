import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getIdentity(){
    const user= localStorage.getItem("identity");
    if(!user){
      return null;
    }
     const a= JSON.parse(user);
    return a;
  }
}
