import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public succes=false
  public message: any
  public error= false
  constructor() { }
}
