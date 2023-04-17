import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public identity: any
  constructor(private authService: AuthService, private _router: Router){
    this.identity= this.authService.getIdentity()
  }
  
  canActivate(){
    if(this.identity && (this.identity.modifiedPwd==true)){
      return true;
    }
    else if(this.identity && (this.identity.modifiedPwd==false)){
      this._router.navigateByUrl('/modifUserPassword');
      return false
    }

    else{
      this._router.navigateByUrl('/login');
      return false
    }
    
  }
  
}
