import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Archive } from 'src/app/models/archive';
import { CategorieDoc } from 'src/app/models/categoriedoc';
import { Document } from 'src/app/models/document';
import { ActionsService } from 'src/app/services/action.service';
import {  ArchiveService } from 'src/app/services/archive.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liste-service-document',
  templateUrl: './liste-service-document.component.html',
  styleUrls: ['./liste-service-document.component.scss']
})
export class ListeServiceDocumentComponent implements OnInit {
  public data: any
  pipe = new DatePipe('en-US');
  public debut: any;
  public fin: any;
  public succes=false
  public error= false
  public id: any
  public identity: any
  categoriedoc: CategorieDoc[];
  document: Document[];
  public todayDate: any
  public url = environment.baseUrl
  archive: Archive[];
  public documentTempoArray= new Array()
 
  constructor(
    private authService: AuthService,
    public sharedService: SharedService,
    public archiveService:ArchiveService,
    public actionService: ActionsService,
    private activatedRoute: ActivatedRoute,
    public documentService: DocumentService,
    private _router: Router,
    ) { 
    this.identity= this.authService.getIdentity()
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
      this.todayDate=  this.pipe.transform(new Date(), 'dd/MM/yyyy')
    }
  

  ngOnInit(): void {
    this.getAllArchive()
    this.getDocByService()
  }
  

  public getAllArchive(){
    this.archiveService.getAllArchive()
      .subscribe(data=>{
        this.archive= data
        for (let index = 0; index < this.archive.length; index++) {
          this.documentTempoArray[index]= this.archive[index].documentId  
      }
      })
  }

  public addAction(id: any){
    const actionObj={
      libelle: "Téléchargement", 
      documentId: id,
      estActif: 1,
      creationUserId: this.identity._id,
      creationDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
      modifUserId: this.identity._id,
      modifDate: "",
    }
    this.actionService.addAction(actionObj).subscribe()
  }

  public getDocByService(){
    const documentObj={
      serviceId: this.id
    }
    this.documentService.getDocumentByServiceId(documentObj)
      .subscribe(document=>{
        this.document= document
       
      })
  }

  

  public disableDocument(id: number){
    const documentObj= {
      id: id
    }
    var confirmation= confirm("voulez-vous vraiment supprimer ce document?")
    if(confirmation){
      this.documentService.disableDocument(documentObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        location.reload()
      },
      (error)=>{
        this.sharedService.error=true
        this.sharedService.message= error.error.error;
      })
    }
    
  }

  ngOnDestroy(): void {
     this.sharedService.message=undefined
     this.sharedService.error=false
     this.sharedService.succes=false
  }
}
