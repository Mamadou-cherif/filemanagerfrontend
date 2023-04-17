import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Structure } from 'src/app/models/structure';
import { SharedService } from 'src/app/services/shared.service';
import { StructureService } from 'src/app/services/structure.service';
declare var $:any
@Component({
  selector: 'app-liste-structure',
  templateUrl: './liste-structure.component.html',
  styleUrls: ['./liste-structure.component.scss']
})
export class ListeStructureComponent implements OnInit {
  structure: Structure[];
  public data: any
  public succes=false
  public error= false
  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    public sharedService: SharedService,
    private structureService: StructureService
    ) { }
  

  ngOnInit(): void {
    this.getAllStructure()
  }
  
  public getAllStructure(){
    this.structureService.getAllStructure()
      .subscribe(structure=>{
        this.structure= structure
      })
  }

  public disableStructure(id: number){
    const structureObj= {
      id: id
    }
    var confirmation= confirm("voulez-vous vraiment supprimer cette structure?")
    if(confirmation){
      this.structureService.disableStructure(structureObj)
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
