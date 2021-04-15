import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.authService.register(email, password)
      .subscribe((response)=>{
        console.log(response),
        error => {
          console.warn(error)
        }
      });
  }
}
