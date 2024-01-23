import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import valid from './valid'

const api = 'https://ldap-api.login.no/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm!: FormGroup;
    feedback: string = ''

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.initForm();
    }

    async login() {
        const username = this.loginForm.get('username')?.value || 'empty'
        const password = this.loginForm.get('password')?.value || 'empty'

        const response = await fetch(api, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: username, pass: password})
        });

        if (!response.ok) {
            this.feedback = 'Login failed. Please check your credentials.';
            console.log("Fetch failed")
            return
        }

        const data = await response.json()
        document.cookie = `token=${data.authorized}; path=/`;
        this.feedback = 'Login failed. Please check your credentials.';
        this.authService.setAuthenticatedStatus(valid(data.authorized));
        this.router.navigate(['dashboard'])
    }

    private initForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })

        // Subscribe to value changes for a specific form control
        // this.loginForm?.valueChanges.subscribe((value) => {
        //     console.log('login form value changed:', value);
        // });
    }
}
