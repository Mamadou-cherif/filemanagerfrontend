import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Archive } from '../models/archive';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  public baseUrl=  environment.baseUrl;
  
  constructor(private _http:HttpClient) { }

  public addArchive(archive: any){
    return this._http.post<string>(this.baseUrl+"ajoutArchive", archive)
  }

  public getArchiveByStructure(archive: any){
    return this._http.post<Archive[]>(this.baseUrl+"getArchiveByStructure", archive)
  }
  
  public documentByServiceOrCategorie(archive: any){
    return this._http.post<Archive[]>(this.baseUrl+"documentByServiceOrCategorie", archive)
  }

  public disableArchive(service: any){
    return this._http.put<string>(this.baseUrl+"disableArchive", service)
  }

  public updateArchive(archive: any){
    return this._http.put<string>(this.baseUrl+"modifArchive", archive)
  }

  public deleteArchive(id: any){
    return this._http.delete<string>(this.baseUrl+"deleteArchive/"+id)
  }

  public getOneArchive(id: any){
    return this._http.get<Archive>(this.baseUrl+"getOneArchive/"+id)
  }

  public getAllArchive(){
    return this._http.get<Archive[]>(this.baseUrl+"getAllArchive")
  }
}
