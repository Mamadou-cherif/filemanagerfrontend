import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

declare var $:any

@Component({
  selector: 'app-liste-structure-user',
  templateUrl: './liste-structure-user.component.html',
  styleUrls: ['./liste-structure-user.component.scss']
})
export class ListeStructureUserComponent implements OnInit {
  user: User[];
  public data: any
  public succes=false
  public error= false
  public id: any

  constructor(
    private activatedRoute: ActivatedRoute,
    public sharedService: SharedService,
    private userService: UserService
    ) {
      this.id= this.activatedRoute.snapshot.paramMap.get("id")
     }
  

  ngOnInit(): void {
    this.getAllUser()
  }
  
  public getAllUser(){
    const userObj={
      structureId:  this.id
    }
    this.userService.getUserByStructure(userObj)
      .subscribe(user=>{
        this.user= user
      })
  }

  public disableUser(id: number){
    var confirmation= confirm("voulez-vous vraiment supprimer cet utilisateur?")
    if(confirmation){
      this.userService.disableUser(id)
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
