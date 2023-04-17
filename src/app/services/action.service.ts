import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '../models/action';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  public baseUrl=  environment.baseUrl;
    
  constructor(private _http:HttpClient) { }

  public addAction(action: any){
    return this._http.post<string>(this.baseUrl+"ajoutAction", action)
  }

  public getActionByService(action: any){
    return this._http.post<Action[]>(this.baseUrl+"getActionByService", action)
  }
 
  public updateAction(action: any){
    return this._http.put<string>(this.baseUrl+"modifAction", action)
  }

  public disableAction(action: any){
    return this._http.put<string>(this.baseUrl+"disableAction", action)
  }

  public deleteAction(id: any){
    return this._http.delete<string>(this.baseUrl+"deleteAction/"+id)
  }

  public getOneAction(id: any){
    return this._http.get<Action>(this.baseUrl+"getOneAction/"+id)
  }

  public getAllAction(){
    return this._http.get<Action[]>(this.baseUrl+"getAllAction")
  }
}
