import {EventEmitter, Injectable, Output} from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";



@Injectable({
	providedIn: 'root'
})
export class AccountService {
	
	private apiUrl: string = environment.apiUrl;
	@Output() setUserAvatar: EventEmitter<string> = new EventEmitter<string>();
	
	
	constructor(private httpClient: HttpClient) { }
	
	
	async getCurrentUserInfo(){

		return await this.httpClient.get<any>(`${this.apiUrl}/account`)
			.toPromise()
			.then((user: any) => { return user;	})
			.catch(() => { return null; });
	}
	
	
	async updateAccount(data: FormData){

		return await this.httpClient.put<any | string []>(`${this.apiUrl}/account`, data)
			.toPromise()
			.then((result: any) => {
					
					this.setUserAvatar.emit(result['avatar']);
					
					return result;
				})
			.catch(
				(error: any) => {
					
					let messages: string [] = [];
					
					if (error['error'].errors) {

						error['error'].errors.forEach((v: string) => messages.push(v));
					}

					else messages.push(error['error'].Message);

					return messages;
				}
			);
	}
	
	
	changePassword(data: any){

		return this.httpClient.post(`${this.apiUrl}/account/change-password`, data);
	}
}
