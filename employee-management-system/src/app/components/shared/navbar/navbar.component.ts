import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../../services/user-store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavBarComponent {
  constructor(private authService:AuthService,private router:Router,private toaster:ToasterService,private userStore:UserStoreService){}
  islogged:boolean=false;
  isDarkMode:boolean=false;
  imageSrc:string;
  username:string;
  onClickLogout(){
    this.toaster.onShowToast("Logout Success",'success');
    this.username="";
    this.imageSrc="../../../assets/images/user-table.jpg"
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
  showLogOut(){
    this.islogged=!this.islogged
  }
  ngOnInit(){
    this.userStore.getUser().subscribe({
      next:(res)=>{
      const name=this.authService.getUsername();
      this.username=name || res;
      }
    })
    this.imageSrc=this.authService.getImage();
  }
  onClickToggleDarkMode(){
    this.isDarkMode=!this.isDarkMode;
    if(this.isDarkMode){
      document.body.style.background='black'
      document.body.style.color='white'
    }
    else{
      document.body.style.background='white';
      document.body.style.color='black'


    }
  }


}
