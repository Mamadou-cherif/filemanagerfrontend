import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liste-utilisateur-service',
  templateUrl: './liste-utilisateur-service.component.html',
  styleUrls: ['./liste-utilisateur-service.component.scss']
})
export class ListeUtilisateurServiceComponent implements OnInit {
  user: User[];
  public data: any
  public succes=false
  public error= false
  public id: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    public sharedService: SharedService,
    private userService: UserService
    ) {
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
     }
  

  ngOnInit(): void {
    this.getUserByServiceId()
  }
  
  public getUserByServiceId(){
    const userObj={
      serviceId:  this.id
    }
    this.userService.getUserByService(userObj)
      .subscribe(user => {
        this.user= user
      })
  }

  public disableUser(user: any){
    var confirmation= confirm("voulez-vous vraiment supprimer cet utilisateur?")
    if(confirmation){
      this.userService.disableUser(user)
      .subscribe(success=>{
        this.sharedService.succes=true
        this.sharedService.message= success;
        this.ngOnInit()
      },
      error=>{
        this.sharedService.error=true
        this.sharedService.message= error.error.error;
      })
    }
    
  }

  ngOnDestroy(): void {
     this.sharedService.message=undefined
     this.sharedService.error=false
     this.sharedService.succes=false
  }
}
