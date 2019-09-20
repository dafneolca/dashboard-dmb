import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  environment = "Select Environment";
  showDropDown: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  login(data) {
    data.env = this.environment
    console.log('[Login]', data);
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
