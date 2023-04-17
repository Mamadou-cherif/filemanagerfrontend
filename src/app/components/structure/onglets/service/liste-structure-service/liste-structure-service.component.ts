import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sservice } from 'src/app/models/sservice';
import { Structure } from 'src/app/models/structure';
import { SharedService } from 'src/app/services/shared.service';
import { SserviceService } from 'src/app/services/sservice.service';
import { StructureService } from 'src/app/services/structure.service';
declare var $:any
@Component({
  selector: 'app-liste-structure-service',
  templateUrl: './liste-structure-service.component.html',
  styleUrls: ['./liste-structure-service.component.scss']
})
export class ListeStructureServiceComponent implements OnInit {
  structure: Structure[];
  public service: Sservice[]
  public data: any
  public succes=false
  public error= false
  public id: any

  constructor(
    public sharedService: SharedService,
    private structureService: StructureService,
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private serviceService: SserviceService
    ) { 
      this.id= this.activatedRoute.snapshot.paramMap.get("id")

    }
  

  ngOnInit(): void {
    this.getServiceByStrucuture()
  }
  
  public getServiceByStrucuture(){
    const serviceObj={
      structureId: this.id
    }
    this.serviceService.getServiceByStrucuture(serviceObj)
      .subscribe(service=>{
        this.service= service
      })
  }

  routeTo(id: any){
    this._router.navigateByUrl("/fileManager/modifService/" + id)
  }

  public disableStructure(id: number){
    const structureObj= {
      id: id
    }
    var confirmation= confirm("voulez-vous vraiment supprimer ce service?")
    if(confirmation){
      this.serviceService.disableService(structureObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        this.ngOnInit()
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
