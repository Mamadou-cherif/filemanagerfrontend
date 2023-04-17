import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadDocService {

  public baseUrl = environment.baseUrl
  public token: any
  constructor(private http: HttpClient, private auth: AuthService) {
  }

  // upload(formdata: FormData): any {

  //   return this.http.post(this.baseUrl + "uploadFiles", formdata);
  // }


  uploadDocment(formdata: FormData): any {

    return this.http.post(this.baseUrl + "documents", formdata);
  }

  uploadPgDocment(formdata: FormData): any {

    return this.http.post(this.baseUrl + "documentPgprioritaires", formdata);
  }
}
