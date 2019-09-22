import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class IDService {
  constructor(private http: HttpClient, private router: Router) { }

  user = "";

  mockRestAPI = 'https://jsonplaceholder.typicode.com'

  // LOCAL STORAGE
  setUser(username) {
    localStorage.setItem('user', JSON.stringify(username));
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'))
    return this.user;
  }

  loggedIn() {
    return this.user != "";
  }

  clearUser() {
    localStorage.removeItem('user');
  }

  // DATABASE
  getAllData() {
    return this.http.get(`${this.mockRestAPI}/users`)
  }



}
