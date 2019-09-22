import { Component, OnInit } from '@angular/core';
import { IDService } from '../../services/id.service';

import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faBars = faBars;

  loggedIn: boolean;
  user;

  displayNav: boolean = false;

  constructor(private idService: IDService) { }

  ngOnInit() {
    this.loggedIn = this.idService.loggedIn();
    this.user = this.idService.getUser();
  }

  toggleMenuView() {
    this.displayNav = !this.displayNav;
  }

  logout() {
    this.idService.clearUser();
  }

}
