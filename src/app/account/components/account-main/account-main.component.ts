import { Component, OnInit } from '@angular/core';
import {  FormGroup } from "@angular/forms";
import { AccountService } from "../../services/account.service";
import { AccountForm } from "../../forms/account-form";
import { AuthService } from "../../../auth/services/auth.service";
import { ChangePasswordForm } from "../../forms/change-password-form";



@Component({
    selector: 'app-account-main',
    templateUrl: './account-main.component.html'
})
export class AccountMainComponent implements OnInit {
	
	isDefaultAuthorized!: boolean;
	accountForm = new AccountForm().form;
	passwordForm: FormGroup = new ChangePasswordForm().form;
	uploadedAvatar!: string;
	private avatar!: File;
	changedAvatar!: string;
	avatarError!: string;
	accountMessages: string [] = [];
	accountSuccess: boolean = false;
	accountButtonClicked: boolean = false;
	passwordMessages: string [] = [];
	passwordSuccess: boolean = false;
	passwordButtonClicked: boolean = false;
	
	
	constructor(private accountService: AccountService, private authService: AuthService) {
		
		this.isDefaultAuthorized = authService.isBasicAuthorized();
	}
	
	
	ngOnInit(): void {
		(async () => {
			
			let user =  await this.accountService.getCurrentUserInfo();
			
			this.initForm(user);
			
			this.uploadedAvatar = user['avatar'];
		})();
	}
	
	
	async submitAccountForm(){
		
		this.accountForm.markAllAsTouched();
		
		if(this.accountForm.valid){
			
			this.accountButtonClicked = true;
			
			let data = this.getFormData();
			
			let result = await this.accountService.updateAccount(data);
			
			if (Array.isArray(result)){
				
				this.accountMessages = result;
				
				this.accountSuccess = false;
			}
			
			else {
				
				this.initForm(result);
				
				this.uploadedAvatar = result['avatar'];
				
				this.changedAvatar = "";
				
				this.accountForm.get('avatar')?.reset();
				
				this.accountSuccess = true;
				
				this.accountMessages.push("Account updated successfully");
				
				setTimeout(() => this.accountMessages.length = 0, 5000);
			}
			
			this.accountButtonClicked = false;
		}
	}
	
	
	avatarSelected(event: any){
		
		if (event.target.files.length > 0){
			
			this.avatar = event.target.files[0];
			
			this.changedAvatar = this.avatar.name;
			
			let fileMaxSize = 500;
			
			this.avatarError = "";
			
			if(this.avatar.size > (fileMaxSize * 1000))	this.avatarError = `The file size cannot exceed ${fileMaxSize} Kb`;
			
			if(!this.avatar.type.includes('image'))	this.avatarError = "Incorrect file format";
		}
	}
	
	
	submitChangePasswordForm(){

		this.passwordForm.markAllAsTouched();
		
		if (this.passwordForm.valid){
			
			this.passwordMessages.length = 0;
			
			this.passwordButtonClicked = true;
			
			this.accountService.changePassword(this.passwordForm.value).subscribe((result: any) =>{

				this.passwordSuccess = true;

				this.passwordMessages.push(result['message']);

				this.passwordButtonClicked = false;

				this.passwordForm.reset();

				setTimeout(() => this.passwordMessages.length = 0, 5000);
			},
				
			error => {

				if(Array.isArray(error['error'].errors)){
					error['error'].errors.forEach((v: any) => {this.passwordMessages.push(v)});
				}

				else this.passwordMessages.push(error['error'].Message);

				this.passwordButtonClicked = false;
			});
		}
	}
	
	
	private initForm(user: any){

		this.accountForm.get('firstName')?.setValue(user['firstName']);
		this.accountForm.get('lastName')?.setValue(user['lastName']);
		this.accountForm.get('email')?.setValue(user['email']);
		this.accountForm.get('phone')?.setValue(user['phone']);
		this.accountForm.get('webSite')?.setValue(user['webSite']);
		this.accountForm.get('addressZipCode')?.setValue(user['addressZipCode']);
		this.accountForm.get('addressCity')?.setValue(user['addressCity']);
		this.accountForm.get('addressStreet')?.setValue(user['addressStreet']);
		this.accountForm.get('addressSuit')?.setValue(user['addressSuit']);
		this.accountForm.get('companyName')?.setValue(user['companyName']);
		this.accountForm.get('companyCatchPhrase')?.setValue(user['companyCatchPhrase']);
		this.accountForm.get('companyBs')?.setValue(user['companyBs']);
	}
	
	
	private getFormData(): FormData{
		
		let formData = new FormData();
		
		formData.append('firstName', this.accountForm.get('firstName')?.value);
		
		if(this.accountForm.get('lastName')?.value){
			formData.append('lastName', this.accountForm.get('lastName')?.value);
		}
		
		formData.append('email', this.accountForm.controls['email'].value);
		
		if (this.accountForm.get('phone')?.value){
			formData.append("phone", this.accountForm.get('phone')?.value);
		}
		
		if (this.accountForm.get('webSite')?.value){
			formData.append("webSite", this.accountForm.get('webSite')?.value);
		}
		
		if (this.accountForm.get('addressZipCode')?.value){
			formData.append('addressZipCode', this.accountForm.get('addressZipCode')?.value);
		}
		
		if (this.accountForm.get('addressCity')?.value){
			formData.append("addressCity", this.accountForm.get('addressCity')?.value);
		}
		
		if (this.accountForm.get('addressStreet')?.value){
			formData.append('addressStreet', this.accountForm.get('addressStreet')?.value);
		}
		
		if (this.accountForm.get('addressSuit')?.value){
			formData.append('addressSuit', this.accountForm.get('addressSuit')?.value);
		}
		
		if (this.accountForm.get('companyName')?.value){
			formData.append('companyName', this.accountForm.get('companyName')?.value);
		}
		
		if (this.accountForm.get('companyCatchPhrase')?.value){
			formData.append('companyCatchPhrase', this.accountForm.get('companyCatchPhrase')?.value);
		}
		
		if (this.accountForm.get('companyBs')?.value){
			formData.append('companyBs', this.accountForm.get('companyBs')?.value);
		}
		
		if(this.avatar){
			formData.append('avatar', this.avatar);
		}
		
		return formData
	}
}
