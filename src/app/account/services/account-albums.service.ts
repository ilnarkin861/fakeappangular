import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  	providedIn: 'root'
})
export class AccountAlbumsService {
	
	private apiUrl: string = environment.apiUrl;
	
 
	constructor(private httpClient: HttpClient) { }
	
	
	getUserAlbums(offset: number, limit: number){
		return this.httpClient.get(`${this.apiUrl}/useralbums?offset=${offset}&limit=${limit}`);
	}
	
	
	userAlbumDetails(id: number){
		return this.httpClient.get(`${this.apiUrl}/useralbums/${id}`);
	}
	
	
	addAlbum(data: any){
		return this.httpClient.post(`${this.apiUrl}/useralbums/add`, data)
	}


	updateAlbum(data: any){
		return this.httpClient.put(`${this.apiUrl}/useralbums/edit`, data)
	}
	
	
	deleteAlbum(id: number){
		return this.httpClient.delete(`${this.apiUrl}/useralbums/delete/${id}`);
	}
	
	
	getUserAlbumPhotos(albumId: number, offset: number, limit: number){
		return this.httpClient.get(`${this.apiUrl}/useralbums/${albumId}/photos?offset=${offset}&limit=${limit}`);
	}
	
	
	uploadPhotos(data: any): Observable<HttpEvent<any>>{
		
		const request = new HttpRequest('POST', `${this.apiUrl}/useralbums/photos/upload`, data, {
			reportProgress: true,
			responseType: 'json',
			withCredentials: true
		});
		
		return this.httpClient.request(request);
	}
	
	
	deletePhoto(albumId: number, photoId: number){
		return this.httpClient.delete(`${this.apiUrl}/useralbums/${albumId}/photos/delete/${photoId}`);
	}
}
