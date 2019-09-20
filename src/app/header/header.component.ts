import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faBars = faBars;

  loggedIn: boolean;


  apiKey: number;

  displayNav: boolean = false;

  constructor() { }

  ngOnInit() {
    // this.loggedIn = this.apiIdService.hasAdminRights;
  }

  toggleMenuView() {
    this.displayNav = !this.displayNav;
  }

}
