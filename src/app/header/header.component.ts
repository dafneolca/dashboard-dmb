import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;


  apiKey: number;

  displayNav: boolean = false;

  constructor() { }

  ngOnInit() {
    // this.loggedIn = this.apiIdService.hasAdminRights;
  }

  toggleMenuView() {
    console.log("click")
    // if (this.viewMenuInMobile) {
    //   this.viewMenuInMobile = false;
    // }
    // else {
    //   this.viewMenuInMobile = true;
    // }
    this.displayNav = !this.displayNav;
  }

}
