import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorieDoc } from '../models/categoriedoc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriedocService {

  public baseUrl=  environment.baseUrl;
    
  constructor(private _http:HttpClient) { }

  public addCategorieDoc(categoriedoc: any){
    return this._http.post<string>(this.baseUrl+"ajoutCategorieDoc", categoriedoc)
  }

  public getCategorieDocByService(categoriedoc: any){
    return this._http.post<CategorieDoc[]>(this.baseUrl+"getCategorieDocByService", categoriedoc)
  }
 
  public updateCategorieDoc(categoriedoc: any){
    return this._http.put<string>(this.baseUrl+"modifCategorieDoc", categoriedoc)
  }

  public disableCategorieDoc(categoriedoc: any){
    return this._http.put<string>(this.baseUrl+"disableCategorieDoc", categoriedoc)
  }

  public deleteCategorieDoc(id: any){
    return this._http.delete<string>(this.baseUrl+"deleteCategorieDoc/"+id)
  }

  public getOneCategorieDoc(id: any){
    return this._http.get<CategorieDoc>(this.baseUrl+"getOneCategorieDoc/"+id)
  }

  public getAllCategorieDoc(){
    return this._http.get<CategorieDoc[]>(this.baseUrl+"getAllCategorieDoc")
  }
}
