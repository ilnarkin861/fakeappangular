import {Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { RegisterForm } from "../../forms/register-form";



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnDestroy {
	
	registerForm: FormGroup = new RegisterForm().form;
	buttonClicked: boolean = false;
	messages: string [] = [];
	private timerInterval!: any;
	timerDone: boolean = true;
	seconds: number = 10;
	
	

	constructor(private authService: AuthService, private router: Router) {

		if(authService.isAuthenticated()) router.navigate(['/account']).then();
	}
	
	
	register(){
		
		this.registerForm.markAllAsTouched();
		
		if(this.registerForm.valid){
			
			this.buttonClicked = true;
			
			this.messages.length = 0;
			
			this.authService.basicRegister(this.registerForm.value).subscribe(() => {

				this.buttonClicked = false;

				this.registerForm.reset();

				this.startTimer();
			},

			error => {

				if(Array.isArray(error['error'].errors)){

					error['error'].errors.forEach((v: any) => {this.messages.push(v)});
				}

				else this.messages.push(error['error'].Message);

				this.buttonClicked = false;
			});
		}
	}
	
	
	private startTimer(){

		let timer = this.createTimer(0, this.seconds);
		
		this.timerDone = false;
		
		this.timerInterval = setInterval(() => {
			
			let t = timer();
			
			if (t.done) {
				
				this.timerDone = t.done;
				
				clearInterval(this.timerInterval);
				
				this.router.navigate(['/auth/login']).then();
			}
			
			this.seconds = t.second;
			
		}, 1000);
	}

	
	private createTimer(minute = 0, second = 60) {
		
		let timer = {
			minute: minute,
			second: second > 60 ? 60 : second,
			done: false
		}
		
		return function (){
			
			if (timer.minute || timer.second){
				
				if (!timer.second) timer.second = 60;
				
				if(timer.second === 60 && timer.minute) timer.minute--;
				
				timer.second--;
				
				if (!timer.minute && !timer.second) timer.done = true;
			}
			
			return timer;
		}
	}

	
	ngOnDestroy(): void {

		clearInterval(this.timerInterval);
	}
}
