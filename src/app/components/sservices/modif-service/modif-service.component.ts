import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sservice } from 'src/app/models/sservice';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { SserviceService } from 'src/app/services/sservice.service';
import { StructureService } from 'src/app/services/structure.service';

@Component({
  selector: 'app-modif-service',
  templateUrl: './modif-service.component.html',
  styleUrls: ['./modif-service.component.scss']
})
export class ModifServiceComponent implements OnInit, OnDestroy {
  public structure: any
  pipe = new DatePipe('en-US');
  public todayDate: any
  public identity: any
  public service: Sservice
  @Input() structureId : any
  public id: any
  constructor(
    public serviceService: SserviceService,
    public sharedService: SharedService,
    public authService: AuthService,
     private activatedRoute: ActivatedRoute
     ) { 
      this.todayDate= this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm',"GMT")
      this.identity= this.authService.getIdentity()
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
      
      // this.structure= new Structure("","","","","",1,"","","" ,"")
  }
  

  ngOnInit(): void {
    this.getOneService(this.id)
  }

  getOneService(id: any){
    this.serviceService.getOneSservice(id)
      .subscribe(service=>{
        this.service= service
      })
  }

 

  ngOnDestroy(): void {
    this.sharedService.error=false
    this.sharedService.succes=false
  }
}
