import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";



@Injectable({
	providedIn: 'root'
})
export class AccountPostsService {
	
	private apiUrl: string = environment.apiUrl;
	

  	constructor(private httpClient: HttpClient) { }
	
	
	getUserPosts(offset: number, limit: number){
  		return this.httpClient.get(`${this.apiUrl}/userposts?offset=${offset}&limit=${limit}`);
	}
	
	
	userPostDetails(id: number){
  		return this.httpClient.get(`${this.apiUrl}/userposts/${id}`);
	}
	
	
	addPost(data: any){
  		return this.httpClient.post(`${this.apiUrl}/userposts/add`, data)
	}


	updatePost(data: any){
		return this.httpClient.put(`${this.apiUrl}/userposts/edit`, data)
	}
	
	
	deletePost(id: number){
  		return this.httpClient.delete(`${this.apiUrl}/userposts/delete/${id}`);
	}
}
