import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-modif-user',
  templateUrl: './modif-user.component.html',
  styleUrls: ['./modif-user.component.scss']
})
export class ModifUserComponent implements OnInit {
  public user: any
  public id: any
  
  constructor(
    private userService: UserService,
    public sharedService: SharedService,
     private router: Router,
     private activatatedRoute: ActivatedRoute,
     ) { 
    this.id= this.activatatedRoute.snapshot.paramMap.get('id')
  }
  

  ngOnInit(): void {
    this.getoneUser(this.id)
  }

  sendValues(formValue:NgForm){
    const userObj={
      id: this.id,
      name: formValue.value.name,
      prenoms: formValue.value.prenoms,
      telephone: formValue.value.telephone,
      type_user: formValue.value.type_user,
    }
    
    this.userService.updateUser(userObj)
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

  public getoneUser(id: any){
    this.userService.getOneUser(id)
    .pipe(response=>response)
    .subscribe(user=>{
      this.user= user;
      console.log(this.user)
    })
  }

  ngOnDestroy(): void {
         this.sharedService.error=false
    this.sharedService.succes=false
  }
}
