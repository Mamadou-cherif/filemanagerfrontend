import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieDoc } from 'src/app/models/categoriedoc';
import { Sservice } from 'src/app/models/sservice';
import { CategoriedocService } from 'src/app/services/categoriedoc.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-liste-service-categoriedoc',
  templateUrl: './liste-service-categoriedoc.component.html',
  styleUrls: ['./liste-service-categoriedoc.component.scss']
})
export class ListeServiceCategoriedocComponent implements OnInit {
  public service: Sservice[]
  public data: any
  public succes=false
  public error= false
  public id: any
  categoriedoc: CategorieDoc[];

  constructor(
    public sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private categorieDocService: CategoriedocService,
    private _router: Router,
    ) { 
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
    }
  

  ngOnInit(): void {
    this.getCategorieDocByService()
  }
  
  public getCategorieDocByService(){
    const categoriedocObj={
      serviceId: this.id
    }
    this.categorieDocService.getCategorieDocByService(categoriedocObj)
      .subscribe(categoriedoc=>{
        this.categoriedoc= categoriedoc
      })
  }

  routeTo(id: any){
    this._router.navigateByUrl("/fileManager/modifCategorieDoc/" + id)
  }

  public disableStructure(id: number){
    const structureObj= {
      id: id
    }
    var confirmation= confirm("voulez-vous vraiment supprimer cette catégorie de document?")
    if(confirmation){
      this.categorieDocService.disableCategorieDoc(structureObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        location.reload()
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
