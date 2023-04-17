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
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  public service: Sservice[]
  public categoriedoc: CategorieDoc[]
  public identity: any
  public serviceId: any
  public oneService: Sservice
  public categorieId: any
  public temporaryServiceArray = new Array()
  pipe = new DatePipe('en-US');
  public structure: Structure[]
  document: any;
  public url = environment.baseUrl

  constructor( 
    private authService: AuthService,
    private documentService: DocumentService,
    private serviceService: SserviceService,
     private categorieDocService: CategoriedocService,
     private archiveService: ArchiveService
     ) { 
      this.identity= this.authService.getIdentity()
      this.serviceId=""
      this.categorieId= ""
     }

  ngOnInit(): void {
    if(this.identity.structureId || this.identity.structureId != null){
      this.getArchiveByStructure(this.identity.structureId)
      this.getServiceByStructureId(this.identity.structureId)
    }
    else{
      this.getOneService(this.identity.serviceId)
    }
  }

  public getOneService(id: any){
    this.serviceService.getOneSservice(id)
      .subscribe(data=>{
        this.oneService= data
        this.temporaryServiceArray[0]= this.oneService
        this.service= this.temporaryServiceArray
        this.serviceId= this.oneService._id
        this.getCategorieDocByService(this.serviceId)
      })
  }
 
  
  getArchiveByStructure(id: number){
    const obj={
      structureId: id,
    }

    this.archiveService.getArchiveByStructure(obj)
      .subscribe(data=>{
        this.document=data
      })
  }

  getDocumentByServiceOrCategorie(){

    var structureId
    if(this.identity.structureId == null){
       structureId = this.oneService.structureId
    }
    else{
      structureId = this.identity.structureId
    }
    

    const obj={
      structureId: structureId,
      serviceId: this.serviceId,
      categorieId: this.categorieId
    }

    this.archiveService.documentByServiceOrCategorie(obj)
      .subscribe(data=>{
        this.document=data
      })

  }

  getServiceId(event: any){
    this.serviceId=event

    this.getCategorieDocByService(this.serviceId)
    this.getDocumentByServiceOrCategorie()
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


  getServiceByStructureId(id: any){
    const structureObj= {
      structureId: id
    }
    this.serviceService.getServiceByStrucuture(structureObj)
      .subscribe(data=>{
        this.service= data
      })

  }

}
