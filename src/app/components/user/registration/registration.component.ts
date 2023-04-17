import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared.service';
import { StructureService } from 'src/app/services/structure.service';
import { Structure } from 'src/app/models/structure';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnChanges {
  public user: any
  public structure: Structure[]
  
  constructor(
    private userService: UserService,
    private structureService: StructureService,
    public sharedService: SharedService,
     private router: Router,
     ) { 
    this.user= new User("","","","","","","" ,"","")
  }
  ngOnChanges(changes: SimpleChanges): void {
   
  }
  

  ngOnInit(): void {
    this.getAllStructure()
  }

  sendValues(formValue:NgForm){
    const userObj={
      name: formValue.value.name,
      prenoms: formValue.value.prenoms,
      telephone: formValue.value.telephone,
      type_user: formValue.value.type_user,
      structureId: formValue.value.structureId || undefined,
      password: "0000"
    }
    
    this.userService.addUser(userObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        
      this.router.navigateByUrl("/listeUser")
      },
      error=>{
        this.sharedService.error= true
        this.sharedService.message= error.error.error
      })
  }

  public getAllStructure(){
    this.structureService.getAllStructure()
      .subscribe(data=>{
        this.structure= data
      })
  }

  ngOnDestroy(): void {
         this.sharedService.error=false
        this.sharedService.succes=false
  }
}
