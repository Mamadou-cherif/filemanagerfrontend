import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl=  environment.baseUrl;
    
  constructor(private _http:HttpClient) { }
  
  public addUser(user: any){
    return this._http.post<string>(this.baseUrl+"addUser", user)
  }
  
  public getUserByService(user: any){
    return this._http.post<User[]>(this.baseUrl+"getUserByService", user)
  }
  public getUserByStructure(user: any){
    return this._http.post<User[]>(this.baseUrl+"getUserByStructure", user)
  }

  public modifUserPassword(user: any){
    return this._http.put<string>(this.baseUrl+"modifUserPassword", user)
  }

  public disableUser(id: any){
    return this._http.get<User>(this.baseUrl+"disableUser/"+id)
  }

  public login(user: any){
    return this._http.post<User[]>(this.baseUrl+"login", user)
  }

  public updateUser(user: any){
    return this._http.put<string>(this.baseUrl+"modifUser", user)
  }

  public deleteUser(id: any){
    return this._http.delete<string>(this.baseUrl+"deleteUser/"+id)
  }

  public getOneUser(id: any){
    return this._http.get<User>(this.baseUrl+"getOneUser/"+id)
  }

  public getAllUser(){
    return this._http.get<User[]>(this.baseUrl+"getAllUser")
  }
}
