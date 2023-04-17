import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.scss']
})
export class AsideLeftComponent implements OnInit {
public identity: any
  constructor(private _router: Router, private authService: AuthService) {
    this.identity= this.authService.getIdentity()
   }

   ngOnInit(): void {
  }


  logout(){
    localStorage.removeItem('identity')
    this._router.navigateByUrl("/login")
    

  }
}
