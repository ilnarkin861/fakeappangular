import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";



@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	private authUrl = environment.authApiUrl;

	
	constructor(private httpClient: HttpClient) { }
	
	
	isAuthenticated(): boolean{
		
		let token = localStorage.getItem("access_token");
		
		if (typeof token === "string") {

			const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
			
			return (Math.floor((new Date).getTime() / 1000)) < expiry;
		}
		
		return false;
	}
	
	
	isBasicAuthorized(): boolean{
		
		let token = localStorage.getItem("access_token");
		
		if (typeof token === "string") {
			
			return (JSON.parse(atob(token.split('.')[1]))).loginType === "Basic";
		}
		
		return false;
	}
	
	
	basicRegister(data: any){
		return this.httpClient.post(`${this.authUrl}/auth/signup`, data);
	}
	
	

	async basicLogin(email: string, password: string){
		
		let data = {email: email, password: password};

		return await this.httpClient
			.post<boolean | string []>(`${this.authUrl}/auth`, data)
			.toPromise()
			.then((result: any) => {

				localStorage.setItem("access_token", result.accessToken);

				return true;

			})
			.catch((error: any) => { return this.getErrorMessages(error); }
		);
	}
	
	
	async socialLogin(email: string, identifier: string, userName: string){
		
		let data = {email: email, identifier: identifier, userName: userName}
		
		return await this.httpClient
			.post<boolean | string []>(`${this.authUrl}/auth/social`, data)
			.toPromise()
			.then((result: any) => {

				localStorage.setItem("access_token", result.accessToken);

				return true;
			})
			.catch((error: any) => { return this.getErrorMessages(error); }
		);
	}
	
	
	logout(){ localStorage.removeItem("access_token"); }
	
	
	getToken(): string{	return <string>localStorage.getItem("access_token"); }


	private getErrorMessages(data: any){

		let messages: string [] = [];

		if (data['error'].errors) data['error'].errors.forEach((v: string) => messages.push(v));

		else messages.push(data['error'].Message);

		return messages;
	}
	
}
