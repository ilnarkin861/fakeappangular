import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'



@Injectable({
	providedIn: 'root'
})
export class PostsService {
	
	private apiUrl = environment.apiUrl;
	
	
	constructor(private  httpClient: HttpClient) { }
	
	
	getPostsList(offset: number = 0, limit: number = 0, userId: number = 0){
		
		return this.httpClient
			.get(`${this.apiUrl}/posts?offset=${offset}&limit=${limit}&userId=${userId}`);
	}
	
	
	getPostDetails(id: number){
		
		return this.httpClient.get(`${this.apiUrl}/posts/${id}`);
		
	}
	
	
	getPostCommentsList(postId: number, offset: number, limit: number){
		
		return this.httpClient
			.get(`${this.apiUrl}/posts/${postId}/comments?offset=${offset}&limit=${limit}`);
	}
	
	
	addComment(data: any){
		return this.httpClient.post(`${this.apiUrl}/posts/comments/add`, data);
	}
}
