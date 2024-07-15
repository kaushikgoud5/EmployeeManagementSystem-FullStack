import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt"
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload;
  private baseUrl:string="https://localhost:7098/api/Auth/";
  constructor(private http:HttpClient,private user:UserStoreService) { 
    this.userPayload=this.decodedToken();
  }
  login(loginObj:any){
      return this.http.post(`${this.baseUrl}login`,loginObj)
  }
  signUp(userObj:any){
    return this.http.post(`${this.baseUrl}register`,userObj)
  }
  storeToken(tokenValue:string){
    localStorage.setItem("token",tokenValue);
  }
  getToken(){
    return localStorage.getItem("token");
  }
  storeImage(img){
    localStorage.setItem("image",img)
  }
  getImage(){
   return localStorage.getItem("image")
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem("token");
  }
  signOut(){
    localStorage.clear();
  }
  decodedToken(){
    const jwtHelper=new JwtHelperService();
    const token=localStorage.getItem("token");
    return jwtHelper.decodeToken(token);
  }
  getUsername(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }
  
}
