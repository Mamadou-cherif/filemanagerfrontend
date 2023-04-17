import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any;
  error: any;

  constructor(private auth: AuthService,private _router: Router, private userService: UserService) {
    this.user= new User("","","","","","","","", "")
   }

  ngOnInit(): void {
  }

  login(formValues: NgForm){
    const loginObj={
      telephone: formValues.value.telephone,
      password: formValues.value.password
    }
    this.userService.login(loginObj)
      .subscribe(user=>{
        this.user= user
        localStorage.setItem('identity', JSON.stringify(this.user.user))
        if(this.user.user.structureId != null){
          location.replace("/fileManager/accueil")
        }
        else if(this.user.user.structureId == null && this.user.user.serviceId != null){
          location.replace("/fileManager/accueilService")
        }
        else if(this.user.user.structureId == null && this.user.user.serviceId == null){
          location.replace("fileManager/accueilAdmin")
        }
        
      },
      error=>{
        this.error= error.error.error
        alert(this.error)
      })
  }

}
