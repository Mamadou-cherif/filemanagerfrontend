import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../models/document';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ArchiveService } from './archive.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public todayDate: any
  pipe = new DatePipe('en-US');
  public identity: any
  public baseUrl=  environment.baseUrl;
    
  constructor(
    private authService: AuthService,
    public archiveService:ArchiveService,
    
    private _http:HttpClient
    ) {
    this.identity= this.authService.getIdentity()
    this.todayDate=  this.pipe.transform(new Date(), 'dd/MM/yyyy')

     }

  public addDocument(document: any){
    return this._http.post<string>(this.baseUrl+"ajoutDocument", document)
  }
  
  
  public disableDocument(document: any){
    return this._http.put<string>(this.baseUrl+"disableDocument", document)
  }

  public getDocumentByCategoriedocId(document: any){
    return this._http.post<Document[]>(this.baseUrl+"getDocumentByCategoriedocId", document)
  }

  public getDocumentByConnectedUser(){
    return this._http.get<Document[]>(this.baseUrl+"getDocumentByConnectedUser/"+ this.identity._id)
  }
  
  public getDocumentByServiceId(document: any){
    return this._http.post<Document[]>(this.baseUrl+"getDocumentByServiceId", document)
  }
 // Le sécond paramètre ici est le composant qu'on passe. Il permet de reactualiser la page
  archiveDoc(id: number, currentComponent: any){
    //On va disable le document avant de l'archiver
    this.disableDocument(id).subscribe()
    const archiveObj={
      documentId: id,
      structureId: this.identity.structureId,
      dateArchivage: this.todayDate,
      estActif: 1,
      creationUserId: this.identity._id,
      creationDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
      modifUserId: this.identity._id,
      modifDate: "",
    }

    this.archiveService.addArchive(archiveObj)
      .subscribe(()=>{
        currentComponent.ngOnInit()
      })
  }

  public updateDocument(document: any){
    return this._http.put<string>(this.baseUrl+"modifDocument", document)
  }

  public deleteDocument(id: any){
    return this._http.delete<string>(this.baseUrl+"deleteDocument/"+id)
  }

  public getOneDocument(id: any){
    return this._http.get<Document>(this.baseUrl+"getOneDocument/"+id)
  }

  // public getFile(file: any){
  //   const params = new HttpParams().set('file', file);
  //   return this._http.get<any>(this.baseUrl+"getfile/", {params})
  // }

  getFile(file: any) {

    return this._http.get(this.baseUrl + "getfile/" + file);
  }
  public getAllDocument(){
    return this._http.get<Document[]>(this.baseUrl+"getAllDocument")
  }
}
