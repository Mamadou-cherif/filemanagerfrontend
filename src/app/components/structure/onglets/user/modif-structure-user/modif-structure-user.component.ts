import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared.service';
import { Structure } from 'src/app/models/structure';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modif-structure-user',
  templateUrl: './modif-structure-user.component.html',
  styleUrls: ['./modif-structure-user.component.scss']
})
export class ModifStructureUserComponent implements OnInit {
  pipe = new DatePipe('en-US');
  public user: User
  public id: any
  public identity: any

  
  constructor(
    public authService: AuthService,
    private userService: UserService,
    public sharedService: SharedService,
     private router: Router,
     private activatatedRoute: ActivatedRoute,
     ) { 
    this.identity= this.authService.getIdentity()
    this.id= this.activatatedRoute.snapshot.paramMap.get('id')
  }
  

  ngOnInit(): void {
    this.getoneUser(this.id)
  }

  sendValues(formValue:NgForm){
    const userObj={
      id: this.id,
      structureId: this.user.structureId,
      name: formValue.value.name,
      prenoms: formValue.value.prenoms,
      telephone: formValue.value.telephone,
      type_user: formValue.value.type_user,
      estActif: 1,
      modifUserId: this.identity._id,
      modifDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm')
    }
    
    this.userService.updateUser(userObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        this.router.navigateByUrl("/fileManager/modifStructure/"+this.user.structureId)
      },
      error=>{
        this.sharedService.error= true
        this.sharedService.message= error.error.error
      })
  }

  public getoneUser(id: any){
    this.userService.getOneUser(id)
    .subscribe(user=>{
      this.user= user;
    })
  }

  ngOnDestroy(): void {
         this.sharedService.error=false
    this.sharedService.succes=false
  }
}
