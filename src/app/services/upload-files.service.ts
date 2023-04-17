import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  public baseUrl = environment.baseUrl
  public token: any
  constructor(private http: HttpClient, private auth: AuthService) {
  }

  upload(formdata: FormData): any {

    return this.http.post(this.baseUrl + "uploadFiles", formdata);
  }

}
