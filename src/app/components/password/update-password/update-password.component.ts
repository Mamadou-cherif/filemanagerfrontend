import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  user: any;
  error: any;
  public identity: any
  public password: any
  public password1: any

  constructor(private auth: AuthService,private _router: Router, private userService: UserService) {
    // this.user= new User("","","","","","","","")
   this.identity= this.auth.getIdentity()
  }

  ngOnInit(): void {
  }

  login(formValues: NgForm){
    const loginObj={
      id: this.identity._id,
      telephone: this.identity.telephone,
      password1: formValues.value.password1,
      password: formValues.value.password
    }
    if(loginObj.password == loginObj.password1){
      this.userService.modifUserPassword(loginObj)
      .subscribe(user=>{
        localStorage.removeItem('identity')
        location.replace("/login")
        
      },
      error=>{
        this.error= error.error.error
        alert(this.error)
      })
    }
    else{
      alert("les deux passwords doivent être identitques")
    }
    
  }

}
