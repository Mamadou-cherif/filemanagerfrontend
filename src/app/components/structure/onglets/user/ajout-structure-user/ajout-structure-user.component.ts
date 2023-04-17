import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ajout-structure-user',
  templateUrl: './ajout-structure-user.component.html',
  styleUrls: ['./ajout-structure-user.component.scss']
})
export class AjoutStructureUserComponent implements OnInit {
  public user: any
  public id: any
  public identity: any
  pipe = new DatePipe('en-US');
  
  
  constructor(
    public authService: AuthService,
    private userService: UserService,
    public sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
     ) { 
      this.identity= this.authService.getIdentity()
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
      this.user= new User("","","","","","","","" ,"")
  }
  

  ngOnInit(): void {
  }

  sendValues(formValue:NgForm){
    const userObj={
      structureId: this.id,
      name: formValue.value.name,
      prenoms: formValue.value.prenoms,
      telephone: formValue.value.telephone,
      type_user: formValue.value.type_user,
      password: "0000",
      estActif: 1,
      creationUserId: this.identity._id,
      creationDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
      modifUserId: this.identity._id,
      modifDate: "",
    }
    this.userService.addUser(userObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        
      this.router.navigateByUrl("/fileManager/modifStructure/"+this.id)
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
