import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sservice } from 'src/app/models/sservice';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { SserviceService } from 'src/app/services/sservice.service';

@Component({
  selector: 'app-ajout-structure-service',
  templateUrl: './ajout-structure-service.component.html',
  styleUrls: ['./ajout-structure-service.component.scss']
})
export class AjoutStructureServiceComponent implements OnInit {
  public structure: any
  pipe = new DatePipe('en-US');
  public todayDate: any
  public identity: any
  public service: Sservice
  public id: any

  constructor(
    private activatedRoute: ActivatedRoute,
    public serviceService: SserviceService,
    public sharedService: SharedService,
    public authService: AuthService,
    private router: Router,
     ) { 
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
      this.identity= this.authService.getIdentity()
      this.service= new Sservice("","","","","","",1,"","","" ,"")
  }
  

  ngOnInit(): void {
  }

  sendValues(formValue:NgForm){
    const serviceObj={
      structureId: this.id,
      name: formValue.value.name,
      presonneResponsable: formValue.value.presonneResponsable,
      telephone: formValue.value.telephone,
      email: formValue.value.email,
      estActif: 1,
      creationUserId: this.identity._id,
      creationDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
    }
    this.serviceService.addSservice(serviceObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
         this.router.navigateByUrl("/fileManager/modifStructure/"+ this.id)
      },
      error=>{
        this.sharedService.error= true
        this.sharedService.message= error.error.error
      })
  }

  ngOnDestroy(): void {
         this.sharedService.error=false
    this.sharedService.succes=false
  }
}
