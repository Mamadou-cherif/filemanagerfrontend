import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieDoc } from 'src/app/models/categoriedoc';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriedocService } from 'src/app/services/categoriedoc.service';
import { SharedService } from 'src/app/services/shared.service';
import { SserviceService } from 'src/app/services/sservice.service';
import { StructureService } from 'src/app/services/structure.service';

@Component({
  selector: 'app-modif-categoriedoc',
  templateUrl: './modif-categoriedoc.component.html',
  styleUrls: ['./modif-categoriedoc.component.scss']
})

export class ModifCategoriedocComponent implements OnInit {
  public structure: any
  pipe = new DatePipe('en-US');
  public todayDate: any
  public identity: any
  public id: any
  public oneCategorieDoc: CategorieDoc
  public structureId: any

  constructor(
    public sharedService: SharedService,
    public authService: AuthService,
    public serviceService: SserviceService,
    public categorieDocService: CategoriedocService,
     private activatedRoute: ActivatedRoute
     ) { 
      this.todayDate= this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm',"GMT")
      this.identity= this.authService.getIdentity()
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
      // this.structure= new Structure("","","","","",1,"","","" ,"")
  }
  

  ngOnInit(): void {
    this.getOneCategorieDoc(this.id)
  }

  getOneCategorieDoc(id: any){
    this.categorieDocService.getOneCategorieDoc(id)
      .subscribe(data=>{
        this.oneCategorieDoc= data
        // this.serviceService.getOneSservice(this.oneCategorieDoc.serviceId)
        //   .subscribe(data=>{
        //     this.structureId=data.structureId._id
        //   })
      })
  }

  getStructureIdFromChild(event: any){
    alert(event)
  }

  ngOnDestroy(): void {
    this.sharedService.error=false
    this.sharedService.succes=false
  }

}
