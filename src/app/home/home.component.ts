import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { IDService } from '../services/id.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faChevronDown = faChevronDown;

  environment = "Select Environment";
  showDropDown: boolean = false;
  empty: boolean;

  constructor(private router: Router, private idService: IDService) { }

  ngOnInit() {
  }

  login(data) {
    data.env = this.environment;
    if (data.username === "" || data.password === "" || data.env === "Select Environment") {
      return this.empty = true;
    }
    else {
      this.router.navigate(['admin']);
      this.idService.setUser(data.username)
    }
  }

  thisValue(value) {
    console.log('[Value]', value)
    this.toggleDropDown();
    if (value === "int") {
      this.environment = "Integration"
    }
    else if (value === "dev") {
      this.environment = "Development"
    }
    else {
      this.environment = "Production"
    }
  }

  toggleDropDown() {
    console.log('[ToggleDropdown]');
    this.showDropDown = !this.showDropDown;
  }

}
