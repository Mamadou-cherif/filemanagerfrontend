import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sservice } from '../models/sservice';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SserviceService {
  public baseUrl=  environment.baseUrl;
  
  constructor(private _http:HttpClient) { }

  public addSservice(sservice: any){
    return this._http.post<string>(this.baseUrl+"ajoutService", sservice)
  }
  
  public counterNbOfDocumentInService(sservice: any){
    return this._http.post<number>(this.baseUrl+"counterNbOfDocumentInService", sservice)
  }
  public counterNbOfArchiveInService(sservice: any){
    return this._http.post<number>(this.baseUrl+"counterNbOfArchiveInService", sservice)
  }
  
  public getServiceByStrucuture(sservice: any){
    return this._http.post<Sservice[]>(this.baseUrl+"getServiceByStrucuture", sservice)
  }

  public disableService(service: any){
    return this._http.put<string>(this.baseUrl+"disableService", service)
  }

  public updateSservice(sservice: any){
    return this._http.put<string>(this.baseUrl+"modifService", sservice)
  }

  public deleteSservice(id: any){
    return this._http.delete<string>(this.baseUrl+"deleteService/"+id)
  }

  public getOneSservice(id: any){
    return this._http.get<Sservice>(this.baseUrl+"getOneService/"+id)
  }

  public getAllSservice(){
    return this._http.get<Sservice[]>(this.baseUrl+"getAllService")
  }
}
