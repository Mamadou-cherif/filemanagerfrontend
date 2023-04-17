import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Structure } from 'src/app/models/structure';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { StructureService } from 'src/app/services/structure.service';

@Component({
  selector: 'app-modif-structure',
  templateUrl: './modif-structure.component.html',
  styleUrls: ['./modif-structure.component.scss']
})
export class ModifStructureComponent implements OnInit {
  public structure: any
  pipe = new DatePipe('en-US');
  public todayDate: any
  public identity: any
  public id: any
  constructor(
    private structureService: StructureService,
    public sharedService: SharedService,
    public authService: AuthService,
     private router: Router,
     private activatedRoute: ActivatedRoute
     ) { 
      this.todayDate= this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm',"GMT")
      this.identity= this.authService.getIdentity()
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
      // this.structure= new Structure("","","","","",1,"","","" ,"")
  }
  

  ngOnInit(): void {
    this.getOneStructure(this.id)
  }

  sendValues(formValue:NgForm){
    const structureObj={
      id: this.id,
      name: formValue.value.name,
      presonneResponsable: formValue.value.presonneResponsable,
      telephone: formValue.value.telephone,
      email: formValue.value.email,
      estActif: 1,
      creationUserId: this.identity._id,
      // creationDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
      modifUserId: this.identity._id,
      modifDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
    }
    this.structureService.updateStructure(structureObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        
      this.ngOnInit()
      },
      error=>{
        this.sharedService.error= true
        this.sharedService.message= error.error.error
      })
  }


  public getOneStructure(id: any){
    this.structureService.getOneStructure(id)
      .subscribe(structure=>{
        this.structure= structure
        
      })
  }

  ngOnDestroy(): void {
         this.sharedService.error=false
    this.sharedService.succes=false
  }
}
