import { Component, OnInit } from '@angular/core';
import { Structure } from 'src/app/models/structure';
import { AuthService } from 'src/app/services/auth.service';
import { StructureService } from 'src/app/services/structure.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  public structure: Structure
  public identity: any
  public numberOfService: number
  numberOfDoc: number;
  numberOfArchive: number;

  constructor(private structureService: StructureService, private authService: AuthService) { 
    this.identity= this.authService.getIdentity()
  }

  ngOnInit(): void {
    this.getOneStructure(this.identity.structureId)
    this.counterNbOfDocumentInStructure()
    this.counterNbOfArchiveByStructure()
    this.counterNbOfServiceInStructure()
  }

  getOneStructure(id: any){
    this.structureService.getOneStructure(id)
      .subscribe((data: any)=>{
        this.structure= data
      })
  }

  
  public counterNbOfArchiveByStructure(){
    const obj={
      structureId: this.identity.structureId
    }
    this.structureService.counterNbOfArchiveByStructure(obj)
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

  public counterNbOfDocumentInStructure(){
    const obj={
      structureId: this.identity.structureId
    }
    this.structureService.counterNbOfDocumentInStructure(obj)
      .subscribe((data: number)=>{
        this.numberOfDoc=data
      })
  }
}
