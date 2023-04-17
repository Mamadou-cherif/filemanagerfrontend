import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategorieDoc } from 'src/app/models/categoriedoc';
import { Sservice } from 'src/app/models/sservice';
import { Structure } from 'src/app/models/structure';
import { ArchiveService } from 'src/app/services/archive.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriedocService } from 'src/app/services/categoriedoc.service';
import { DocumentService } from 'src/app/services/document.service';
import { SserviceService } from 'src/app/services/sservice.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
  pipe = new DatePipe('en-US');
  public service: Sservice[]
  public categoriedoc: CategorieDoc[]
  public identity: any
  public serviceId: any
  public oneService: Sservice
  public archive: any
  public structure: Structure[]
  document: any;
  public documentTempoArray= new Array()
  public temporaryServiceArray = new Array()

  public url = environment.baseUrl

  public categorieId: any

  constructor( 
    public archiveService:ArchiveService,
    private authService: AuthService,
    private serviceService: SserviceService,
     private categorieDocService: CategoriedocService,
     private documentService: DocumentService
     ) { 
      this.identity= this.authService.getIdentity()
      this.serviceId=""
      this.categorieId= ""
     }

  ngOnInit(): void {
    this.getAllArchive()
    if(this.identity.structureId && this.identity.structureId != null){
      this.getServiceByStructureId(this.identity.structureId)
    }
    else if(this.identity.serviceId){
      this.getOneService(this.identity.serviceId)
    }
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
  // public getDocByService(id: any){
  //   const documentObj={
  //     serviceId: id
  //   }
  //   this.documentService.getDocumentByServiceId(documentObj)
  //     .subscribe(document=>{
  //       this.document= document
       
  //     })
  // }
public getOneService(id: any){
  this.serviceService.getOneSservice(id)
    .subscribe(data=>{
      this.oneService= data
      this.temporaryServiceArray[0]= this.oneService
      this.service= this.temporaryServiceArray
      this.serviceId= this.oneService._id
      this.getCategorieDocByService(this.serviceId)
      this.getDocumentByServiceId(this.serviceId)
    })
}

  getServiceId(event: any){
    this.serviceId=event
    this.getCategorieDocByService(this.serviceId)
    this.getDocumentByServiceId(this.serviceId)
  }

  public getCategorieDocByService(id: any){
    const categoriedocObj={
      serviceId: id
    }
    this.categorieDocService.getCategorieDocByService(categoriedocObj)
      .subscribe(categoriedoc=>{
        this.categoriedoc= categoriedoc
      })
  }

  getDocByCategorie(id: any){
    const obj= {
      categoriedocId: id
    }
    this.documentService.getDocumentByCategoriedocId(obj)
      .subscribe((data: any)=>{
        this.document= data
      })
  }

  public getCategorieDocId(event: any){
    this.categorieId= event

    this.getDocByCategorie(this.categorieId)
  }

  
  getServiceByStructureId(id: any){
    const structureObj= {
      structureId: id
    }
    this.serviceService.getServiceByStrucuture(structureObj)
      .subscribe(data=>{
        this.service= data
      })

  }

  public getDocumentByServiceId(id: any){
    const obj={
      serviceId: id
    }
    this.documentService.getDocumentByServiceId(obj)
      .subscribe((data: any)=>{
        this.document= data
        console.log(this.document)
      })
  }

}
