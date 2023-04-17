import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Archive } from 'src/app/models/archive';
import { CategorieDoc } from 'src/app/models/categoriedoc';
import { Document } from 'src/app/models/document';
import { Sservice } from 'src/app/models/sservice';
import { ArchiveService } from 'src/app/services/archive.service';
import { CategoriedocService } from 'src/app/services/categoriedoc.service';
import { DocumentService } from 'src/app/services/document.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import { ActionsService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-liste-categoriedoc-document',
  templateUrl: './liste-categoriedoc-document.component.html',
  styleUrls: ['./liste-categoriedoc-document.component.scss']
})
export class ListeCategoriedocDocumentComponent implements OnInit {
  public service: Sservice[]
  public data: any
  public succes=false
  public error= false
  public id: any
  categoriedoc: CategorieDoc[];
  document: Document[];
  archive: Archive[];

  public documentTempoArray= new Array()
  pipe = new DatePipe('en-US');
  public debut: any;
  public fin: any;
  public identity: any

  public url = environment.baseUrl
  constructor(
    private authService: AuthService,
    public archiveService:ArchiveService,
    public sharedService: SharedService,
    public actionService: ActionsService,
    private activatedRoute: ActivatedRoute,
    public documentService: DocumentService,
    private _router: Router,
    ) { 
    this.identity= this.authService.getIdentity()

      this.id= this.activatedRoute.snapshot.paramMap.get("id")
    }
  
 
  ngOnInit(): void {
    this.getAllArchive()
    this.getDocumentByCategoriedocId()
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
  
  public getDocumentByCategoriedocId(){
    const documentObj={
      categoriedocId: this.id
    }
    this.documentService.getDocumentByCategoriedocId(documentObj)
      .subscribe(document=>{
        this.document= document
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

  routeTo(id: any){
    this._router.navigateByUrl("/fileManager/modifCategorieDocDocument/" + id)
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
