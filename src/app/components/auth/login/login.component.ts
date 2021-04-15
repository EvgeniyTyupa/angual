import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide: boolean = false;
  serverError: string = "";

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(){
    const email = this.form.value.email;
    const password = this.form.value.password;
    
    this.authService.login(email, password)
      .subscribe(
        (res) => {
          localStorage.setItem('usertoken', res.token);
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.serverError = err.error.message;
        }
      );
  }
}
