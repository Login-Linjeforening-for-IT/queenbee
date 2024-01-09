import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  login() {
    this.authService.setAuthenticatedStatus(true);
    this.router.navigate(['dashboard']);
  }

  private initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    // Subscribe to value changes for a specific form control
    this.loginForm?.valueChanges.subscribe((value) => {
      console.log('login form value changed:', value);
    });
  }
}
