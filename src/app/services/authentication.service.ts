import { catchError } from 'rxjs/operators';
import { UserToken } from './../interfaces/user';
import { API_ROUTE } from './../routes/api-routes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_API } from '../constants/base-api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private tokenName = 'token';

  constructor(
    private http: HttpClient,
    //déconnexion
    private router: Router
    ) { }

  public logOn(identifiant:any): any{
    return this.http.post(API_ROUTE.LOGON.URI, identifiant);
  }

  getToken(){
    return localStorage.getItem(this.tokenName);
  }

  seTtoken(data: Object){
    //@ts-ignore
    data.hasOwnProperty('token') ? localStorage.setItem(this.tokenName,data.token) : this.logout();
  }

  setInLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  removeInLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  logout(){
    localStorage.clear();
    //déconnection
    this.router.navigate(['/authentication/login']);
  }

  isLogged(){
    return this.getToken() !== null;
  }

  public userLoggedUsername(): string  {
    const token = this.tokenDecoded() as UserToken;
    const username = token.username;
    return username;
  }

  public userLoggedRoles(): string[] {
    const token = this.tokenDecoded() as UserToken;
    const roles = token.roles;
    return roles;
  }

  public tokenExpiration(): number {
    const token = this.tokenDecoded() as UserToken;
    const exp = token.exp;
    return exp;
  }

  public userLoggedEmail(): string {
    const token = this.tokenDecoded() as UserToken;
    const email = token.email;
    return email;
  }

  private tokenDecoded(): UserToken | boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = atob(token.split('.')[1]);
      const decodedTokenJsonFormat = JSON.parse(decodedToken);
      return decodedTokenJsonFormat;
    } else {
      return false;
    }
  }

  resetPassword(password: string) {
    return this.http.post(`${BASE_API}/reset-password`, {  password });
  }

  forgotPassword(email: string) {
    return this.http.post(`${BASE_API}/forgot-password`, { email });
  }

}
