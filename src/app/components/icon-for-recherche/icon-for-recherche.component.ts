import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-icon-for-recherche',
  templateUrl: './icon-for-recherche.component.html',
  styleUrls: ['./icon-for-recherche.component.scss']
})
export class IconForRechercheComponent implements OnInit {
  pageUrl: string
  constructor(private router: Router) {
    this.pageUrl= location.pathname
   }

  ngOnInit(): void {

  }

  checkCurrentUrl(a?:number, b?: number){
  
  }
 

}
