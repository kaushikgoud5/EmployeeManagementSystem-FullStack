import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../../validators/validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLogged: boolean = false;
  loginReactiveForm: FormGroup;
  selectedUrl: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService,
    private user: UserStoreService
  ) {}
  SwitchMode() {
    this.isLogged = !this.isLogged;
  }
  ngOnInit() {
    this.loginReactiveForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        CustomValidators.noSpaceAllowed,
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  login(form:FormGroup){
    this.authService.login(form.value).subscribe({
      next: (res: any) => {
        form.reset();
        this.authService.storeToken(res.token);
        const payload = this.authService.decodedToken();
        this.user.setUser(payload.unique_name);
        this.authService.storeImage(res.image)
        this.toaster.onShowToast(res.message, 'success');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
        this.toaster.onShowToast('Login Falied', 'error');
      },
    });
  }
  signup(form:FormGroup){
    const data = {
      image: this.selectedUrl,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.signUp(data).subscribe({
      next: (res: any) => {
        form.reset();
        this.isLogged = true;
        this.toaster.onShowToast('Registered Success!!', 'success');
      },
      error: (err) => {
        this.toaster.onShowToast('Register Failed', 'error');
      },
    });
  }
  onClickLogin(form:FormGroup) {
    if (this.isLogged) {
      this.signup(form);
      
    } else {
      this.login(form);
      
    }
  }
  onChangeImageUpload(event, profilePic) {
    const file = event.target['files'][0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        profilePic.src = reader.result;
        this.selectedUrl = reader.result;
      }
    });
  }
}
