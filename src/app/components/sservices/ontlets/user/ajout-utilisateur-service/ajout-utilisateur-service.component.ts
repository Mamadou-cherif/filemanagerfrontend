import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { StructureService } from 'src/app/services/structure.service';
import { Structure } from 'src/app/models/structure';
import { SserviceService } from 'src/app/services/sservice.service';
import { Sservice } from 'src/app/models/sservice';

@Component({
  selector: 'app-ajout-utilisateur-service',
  templateUrl: './ajout-utilisateur-service.component.html',
  styleUrls: ['./ajout-utilisateur-service.component.scss']
})
export class AjoutUtilisateurServiceComponent implements OnInit {
  public user: any
  public id: any
  public identity: any
  public service: Sservice
  pipe = new DatePipe('en-US');
  
  
  constructor(
    public authService: AuthService,
    private userService: UserService,
    private serviceService: SserviceService,
    public sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
     ) { 
      this.identity= this.authService.getIdentity()
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
      this.user= new User("","","service","","","","" ,"","")
  }
  

  ngOnInit(): void {
    this.getOneService(this.id)
  }

  sendValues(formValue:NgForm){
    const userObj={
      serviceId: this.id,
      name: formValue.value.name,
      prenoms: formValue.value.prenoms,
      telephone: formValue.value.telephone,
      type_user: "service",
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
        
      this.router.navigateByUrl("/fileManager/modifService/"+this.id)
      },
      error=>{
        this.sharedService.error= true
        this.sharedService.message= error.error.error
      })
  }

  getOneService(id: any){
    this.serviceService.getOneSservice(id)
      .subscribe(data=>{
        this.service= data
      })
  }

  ngOnDestroy(): void {
    this.sharedService.error=false
    this.sharedService.succes=false
  }

}
