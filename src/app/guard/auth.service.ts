import { Injectable } from '@angular/core';
import { DataLogin } from "./../demo/api/variable";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  constructor(private rute: Router) {}
  isLoggedIn() {
    return this.isAuthenticated;
  }

  login() {
    this.isAuthenticated = true;
    return true
  }

  logout() {
    this.isAuthenticated = false;
  }


}
