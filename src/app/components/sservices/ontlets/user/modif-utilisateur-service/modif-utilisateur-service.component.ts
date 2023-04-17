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
  selector: 'app-modif-utilisateur-service',
  templateUrl: './modif-utilisateur-service.component.html',
  styleUrls: ['./modif-utilisateur-service.component.scss']
})
export class ModifUtilisateurServiceComponent implements OnInit {
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
      serviceId: this.user.serviceId,
      name: formValue.value.name,
      prenoms: formValue.value.prenoms,
      telephone: formValue.value.telephone,
      type_user: "service",
      estActif: 1,
      modifUserId: this.identity._id,
      modifDate: this.pipe.transform(new Date(), 'dd/MM/yyyy hh:mm')
    }
    
    this.userService.updateUser(userObj)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        this.router.navigateByUrl("/fileManager/modifService/"+this.user.serviceId)
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
