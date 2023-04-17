import { Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UploadDocService } from 'src/app/services/upload-doc.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from 'src/app/models/document';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { DocumentService } from 'src/app/services/document.service';
import { CategoriedocService } from 'src/app/services/categoriedoc.service';
import { CategorieDoc } from 'src/app/models/categoriedoc';
import { StructureService } from 'src/app/services/structure.service';
import { SserviceService } from 'src/app/services/sservice.service';

@Component({
  selector: 'app-ajout-service-document',
  templateUrl: './ajout-service-document.component.html',
  styleUrls: ['./ajout-service-document.component.scss']
})
export class AjoutServiceDocumentComponent implements OnInit , OnDestroy, OnChanges{
  public document: any
  pipe = new DatePipe('en-US');
  public todayDate: any
  public identity: any
  public isDisabled = false;
  public message=""
  public structureId: any

  categoriedoc: CategorieDoc[];
  public id: any
  constructor(
    private documentService: DocumentService,
    public sharedService: SharedService,
    public authService: AuthService,
    public serviceService: SserviceService,
     private router: Router,
    private uploadService: UploadDocService,
    private categorieService: CategoriedocService,
    private elementref: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {
    this.todayDate= this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm',"GMT")
    this.identity= this.authService.getIdentity()
    this.document= new Document("","","","","","","",1,"","","" ,"")
    this.id= this.activatedRoute.snapshot.paramMap.get('id')
   }
  ngOnChanges(changes: SimpleChanges): void {
  }

  
   ngOnInit(): void {
    this.getCategorieByService(this.id)
  }
  
  compareDate(date1:any,date2: any){
    var timeStamp1= new Date(date1).getTime()
    var timeStamp2= new Date(date2).getTime()

    if(timeStamp1>timeStamp2){
       this.isDisabled= true;
       this.message="La date de fin doit être la date la plus récente"
       return;
    }
    else{
      this.isDisabled= false
    }

  }
  sendValues(formValue:NgForm){
    const documentObj={
      serviceId: this.id,
      reference: formValue.value.reference,
      categoriedocId: formValue.value.categoriedocId,
      link: "",
      debut: formValue.value.debut,
      fin: formValue.value.fin,
      estActif: 1,
      creationUserId: this.identity._id,
      creationDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
      modifUserId: this.identity._id,
      modifDate: "",
    }
    this.documentService.addDocument(documentObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        
      this.router.navigateByUrl("/fileManager/modifService/"+ this.id)
      },
      error=>{
        this.sharedService.error= true
        this.sharedService.message= error.error.error
      })
  }


  getCategorieByService(id: number){
    const categoriedocObj={
      serviceId: id
    }
    this.categorieService.getCategorieDocByService(categoriedocObj)
    .subscribe(categoriedoc=>{
      this.categoriedoc= categoriedoc
      this.serviceService.getOneSservice(this.categoriedoc[0].serviceId)
        .subscribe(data=>{
          this.structureId= data.structureId
         })
        })
  }

 
  upload() {
    
    const inputEl: HTMLInputElement | any = this.elementref.nativeElement.querySelector('#image');
    const formData = new FormData();
    formData.append('image', inputEl.files.item(0));

    this.uploadService.uploadDocment(formData).subscribe(
      (data: any) => {
        if (data) {
        }
      },
      (error: any) => { console.error(error); }
    );
  }

  ngOnDestroy(): void {
    this.sharedService.error=false
    this.sharedService.succes=false
}
}
