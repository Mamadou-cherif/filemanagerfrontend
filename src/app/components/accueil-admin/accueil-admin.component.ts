import { Component, OnInit } from '@angular/core';
import { Sservice } from 'src/app/models/sservice';
import { Structure } from 'src/app/models/structure';
import { AuthService } from 'src/app/services/auth.service';
import { SserviceService } from 'src/app/services/sservice.service';
import { StructureService } from 'src/app/services/structure.service';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.scss']
})
export class AccueilAdminComponent implements OnInit {
  public structure: Structure
  public service: Sservice
  public identity: any
  public numberOfService: number
  numberOfDoc: number;
  numberOfArchive: number;

  constructor(
     private structureService: StructureService,
     private serviceService: SserviceService,
     private authService: AuthService) { 
    this.identity= this.authService.getIdentity()
  }

  ngOnInit(): void {
    // this.getOneStructure(this.identity.structureId)
    this.getOneService(this.identity?.serviceId)
    this.counterNbOfDocumentInService()
    this.counterNbOfArchiveInService()
    this.counterNbOfServiceInStructure()
  }

  getOneStructure(id: any){
    this.structureService.getOneStructure(id)
      .subscribe((data: any)=>{
        this.structure= data
      })
  }

  public getOneService(id: any){
    this.serviceService.getOneSservice(id)
      .subscribe((data: any)=>{
        this.service= data
      })
  }
  
  public counterNbOfArchiveInService(){
    const obj={
      serviceId: this.identity.serviceId
    }
    this.serviceService.counterNbOfArchiveInService(obj)
      .subscribe((data: number)=>{
        this.numberOfArchive=data
      })
  }

  public counterNbOfServiceInStructure(){
    const obj={
      structureId: this.identity.structureId
    }
    this.structureService.counterNbOfServiceInStructure(obj)
      .subscribe((data: number)=>{
        this.numberOfService=data
      })
  }

  public counterNbOfDocumentInService(){
    const obj={
      serviceId: this.identity.serviceId
    }
    this.serviceService.counterNbOfDocumentInService(obj)
      .subscribe((data: number)=>{
        this.numberOfDoc=data
      })
  }
}
