import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'



@Injectable({
	providedIn: 'root'
})
export class UsersService {
	
	private apiUrl = environment.apiUrl;
	
	
	constructor(private  httpClient: HttpClient) { }
	
	
	getUsersList(offset: number, limit: number){
		return this.httpClient.get(`${this.apiUrl}/users?offset=${offset}&limit=${limit}`);
	}
	
	
	getUserDetails(id: number){
		return this.httpClient.get(`${this.apiUrl}/users/${id}`);
	}
}
