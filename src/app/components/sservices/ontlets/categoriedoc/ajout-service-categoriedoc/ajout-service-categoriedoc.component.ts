import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieDoc } from 'src/app/models/categoriedoc';
import { Sservice } from 'src/app/models/sservice';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriedocService } from 'src/app/services/categoriedoc.service';
import { SharedService } from 'src/app/services/shared.service';
import { SserviceService } from 'src/app/services/sservice.service';

@Component({
  selector: 'app-ajout-service-categoriedoc',
  templateUrl: './ajout-service-categoriedoc.component.html',
  styleUrls: ['./ajout-service-categoriedoc.component.scss']
})
export class AjoutServiceCategoriedocComponent implements OnInit {
  public categoriedoc: any
  pipe = new DatePipe('en-US');
  public todayDate: any
  public identity: any
  public service: Sservice
  public id: any

  constructor(
    private activatedRoute: ActivatedRoute,
    public serviceService: SserviceService,
    public sharedService: SharedService,
    private categorieDocService: CategoriedocService,
    public authService: AuthService,
    private router: Router,
     ) { 
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
      this.identity= this.authService.getIdentity()
      this.categoriedoc= new CategorieDoc("","","","","","",1,"","")
  }
  

  ngOnInit(): void {
    this.getOneService(this.id)
  }

  sendValues(formValue:NgForm){
    const categoriedocObj={
      serviceId: this.id,
      libelle: formValue.value.libelle,
      estActif: 1,
      creationUserId: this.identity._id,
      creationDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
      modifUserId: this.identity._id,
      modifDate: "",
    }
    this.categorieDocService.addCategorieDoc(categoriedocObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
         this.router.navigateByUrl("/fileManager/modifService/"+ this.id)
      },
      error=>{
        this.sharedService.error= true
        console.log(error)
        this.sharedService.message= error.error.error
      })
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
