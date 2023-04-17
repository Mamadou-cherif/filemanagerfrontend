import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Structure } from '../models/structure';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  public baseUrl=  environment.baseUrl;
    
  constructor(private _http:HttpClient) { }

  public addStructure(structure: any){
    return this._http.post<string>(this.baseUrl+"ajoutStructure", structure)
  }
  
  

  public counterNbOfArchiveByStructure(structure: any){
    return this._http.post<number>(this.baseUrl+"counterNbOfArchiveByStructure", structure)
  }
  public counterNbOfDocumentInStructure(structure: any){
    return this._http.post<number>(this.baseUrl+"counterNbOfDocumentInStructure", structure)
  }

  public counterNbOfServiceInStructure(structure: any){
    return this._http.post<number>(this.baseUrl+"counterNbOfServiceInStructure", structure)
  }
  
  public getStructureByServiceId(structure: any){
    return this._http.post<Structure[]>(this.baseUrl+"getStructureByServiceId", structure)
  }

  public updateStructure(structure: any){
    return this._http.put<string>(this.baseUrl+"modifStructure", structure)
  }

  public disableStructure(structure: any){
    return this._http.put<string>(this.baseUrl+"disableStructure", structure)
  }

  public deleteStructure(id: any){
    return this._http.delete<string>(this.baseUrl+"deleteStructure/"+id)
  }

  public getOneStructure(id: any){
    return this._http.get<Structure>(this.baseUrl+"getOneStructure/"+id)
  }

  public getAllStructure(){
    return this._http.get<Structure[]>(this.baseUrl+"getAllStructure")
  }
}
