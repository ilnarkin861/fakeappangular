import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { LoginForm } from "../../forms/login-form";



@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

	loginForm: LoginForm = new LoginForm();
	buttonClicked: boolean = false;
	messages!: string [];
	success!: boolean;
	
	
	constructor(private router: Router,
				private httpClient: HttpClient,
				private authService: AuthService) {
		
		if(authService.isAuthenticated()) router.navigate(['/account']).then();
	}
	
	
	async logIn(){

		this.loginForm.form.markAllAsTouched();
		
		if(this.loginForm.form.valid){
			
			this.buttonClicked = true;
			
			let formValue = this.loginForm.form.value;
			
			let result = await this.authService.basicLogin(formValue['email'], formValue['password']);
			
			if (result) {

				if (typeof result === "boolean") window.location.href = "/account";

				else {
					
					this.success = false;
					
					this.messages = result;
				}
			}
			
			this.buttonClicked = false;
		}
	}
}
