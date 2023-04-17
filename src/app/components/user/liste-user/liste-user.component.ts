import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
declare var $:any

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit {
  user: User[];
  public data: any
  public succes=false
  public error= false
  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    public sharedService: SharedService,
    private userService: UserService
    ) { }
  

  ngOnInit(): void {
    this.getAllUser()
  }
  
  public getAllUser(){
    this.userService.getAllUser()
      .subscribe(user=>{
        this.user= user
        console.log("utilisateur",this.user)
      })
  }

  public deleteUser(id: number){
    var confirmation= confirm("voulez-vous vraiment supprimer ce user?")
    if(confirmation){
      this.userService.deleteUser(id)
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
