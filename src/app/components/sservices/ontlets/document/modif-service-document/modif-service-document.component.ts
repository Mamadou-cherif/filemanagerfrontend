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

@Component({
  selector: 'app-modif-service-document',
  templateUrl: './modif-service-document.component.html',
  styleUrls: ['./modif-service-document.component.scss']
})
export class ModifServiceDocumentComponent implements OnInit {
  public document: any
  pipe = new DatePipe('en-US');
  public todayDate: any
  public identity: any
  public isDisabled = false;
  public message=""
  public selectedFile: File ;
  public fileChanged= false 

  categoriedoc: CategorieDoc[];
  public id: any
  constructor(
    private documentService: DocumentService,
    public sharedService: SharedService,
    public authService: AuthService,
     private router: Router,
    private uploadService: UploadDocService,
    private categorieService: CategoriedocService,
    private elementref: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {
    this.todayDate= this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm',"GMT")
    this.identity= this.authService.getIdentity()
    // this.document= new Document("","","","","","","",1,"","","" ,"")
    this.id= this.activatedRoute.snapshot.paramMap.get('id')
   }
  ngOnChanges(changes: SimpleChanges): void {
  }

  
   ngOnInit(): void {
    this.getOneDocument(this.id)
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
    var newFilename;
    if(this.fileChanged== false){
      newFilename=this.document.link
    }
    else{
      newFilename= ""
    }
    const documentObj={
      id: this.id,
      serviceId: this.document.serviceId,
      reference: formValue.value.reference,
      categoriedocId: formValue.value.categoriedocId,
      link: newFilename,
      debut: formValue.value.debut,
      fin: formValue.value.fin,
      estActif: 1,
      modifUserId: this.identity._id,
      modifDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
    }
    this.documentService.updateDocument(documentObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        
      this.router.navigateByUrl("/fileManager/modifService/"+ this.document.serviceId)
      },
      error=>{
        this.sharedService.error= true
        this.sharedService.message= error.error.error
      })
  }

  getOneDocument(id: any){
    this.documentService.getOneDocument(id)
    .subscribe(document=>{
      this.document= document
      this.getCategorieByService(this.document.serviceId)
    })
  }

  getCategorieByService(id: number){
    const categoriedocObj={
      serviceId: id
    }
    this.categorieService.getCategorieDocByService(categoriedocObj)
    .subscribe(categoriedoc=>{
      this.categoriedoc= categoriedoc
    })
  }

  
 
  upload() {
    const inputEl: HTMLInputElement | any = this.elementref.nativeElement.querySelector('#image');
    const formData = new FormData();
    formData.append('image', inputEl.files.item(0));
    this.uploadService.uploadDocment(formData).subscribe(
      (data: any) => {
        if (data) {
          this.fileChanged= true
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
