import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategorieDoc } from 'src/app/models/categoriedoc';
import { Sservice } from 'src/app/models/sservice';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriedocService } from 'src/app/services/categoriedoc.service';
import { SharedService } from 'src/app/services/shared.service';
import { SserviceService } from 'src/app/services/sservice.service';

@Component({
  selector: 'app-categoriedoc-modif',
  templateUrl: './categoriedoc-modif.component.html',
  styleUrls: ['./categoriedoc-modif.component.scss']
})
export class CategoriedocModifComponent implements OnInit, OnDestroy {
  public categoriedoc: CategorieDoc
  pipe = new DatePipe('en-US');
  public todayDate: any
  public identity: any
  public service: Sservice
  public id: any
  @Output() structureId: any
  public eventEmiter= new EventEmitter<any>() 

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
      // this.categoriedoc= new CategorieDoc("","","","","","",1,"","")
  }
  

  ngOnInit(): void {
    this.getOneCategorieDoc(this.id)
  }

  sendValues(formValue:NgForm){

    const categoriedocObj={
      id: this.id,
      serviceId: this.categoriedoc.serviceId,
      libelle: formValue.value.libelle,
      estActif: 1,
      modifUserId: this.identity._id,
      modifDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
    }
    this.categorieDocService.updateCategorieDoc(categoriedocObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
         location.reload()
      },
      error=>{
        this.sharedService.error= true
        console.log(error)
        this.sharedService.message= error.error.error
      })
  }

  returnBack(){
    self.history.back()
  }
  getOneCategorieDoc(id: any){
    this.categorieDocService.getOneCategorieDoc(id)
      .subscribe(categoriedoc=>{
        this.categoriedoc= categoriedoc
        this.serviceService.getOneSservice(this.categoriedoc.serviceId)
        .subscribe(data=>{
          this.structureId= data.structureId
          
          this.eventEmiter.emit(this.structureId)
        })
      })
  }


  ngOnDestroy(): void {
    this.sharedService.message= undefined
    this.sharedService.error=false
    this.sharedService.succes=false
  }
}
