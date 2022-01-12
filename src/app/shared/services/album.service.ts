import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'



@Injectable({
	providedIn: 'root'
})
export class AlbumService {
	
	private apiUrl = environment.apiUrl;
	
	
	constructor(private  httpClient: HttpClient) { }
	
	
	getAlbumsList(offset: number, limit: number, userId: number){
		return this.httpClient.get(`${this.apiUrl}/albums?offset=${offset}&limit=${limit}&userId=${userId}`)
	}
	
	
	getAlbumDetails(id: number){
		return this.httpClient.get(`${this.apiUrl}/albums/${id}`);
	}
	
	
	getPhotos(id: number, offset: number, limit: number){
		return this.httpClient.get(`${this.apiUrl}/albums/${id}/photos?offset=${offset}&limit=${limit}`);
	}
}
