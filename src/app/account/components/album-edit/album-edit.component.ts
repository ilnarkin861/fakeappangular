import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { UserAlbum } from "../../models/user-album";
import { AccountAlbumsService } from "../../services/account-albums.service";
import { UserPhoto } from "../../models/user-photo";



@Component({
    selector: 'app-album-edit',
    templateUrl: './album-edit.component.html'
})
export class AlbumEditComponent implements OnInit, OnDestroy {
	
	private paramsSubscription!: Subscription;
	private albumId!: number;
  	album!: UserAlbum;
  	albumNotFound: boolean = false;
  	photos!: UserPhoto [];
  	private photosLimit: number = 8;
  	photosHasNextPage: boolean = false;
  	loadButtonClicked: boolean = false;
  	uploadProgress: number = 0;
  	uploadErrorMessage: string [] = [];
	
  	
	constructor(private albumService: AccountAlbumsService, private activatedRoute: ActivatedRoute) {

		this.paramsSubscription = activatedRoute.params.subscribe(params => this.albumId = params['id']);
	}

 
	ngOnInit(): void {
		
		this.albumService.userAlbumDetails(this.albumId).subscribe((result: any) => {

			this.album = result;

			this.getPhotos();
		},
			
		error => {

			if(error['error'].StatusCode == 404) this.albumNotFound = true;
		});
	}
	
	
	loadPhotos(){
		
		if(this.photosHasNextPage){
			
			this.loadButtonClicked = true;
			
			this.getPhotos();
		}
	}
	
	
	startUploadPhotos(event: any){
		
		let photos: File[] = Array.from(event.target.files);
		
		if (photos.length > 0){
			
			this.uploadErrorMessage.length = 0;
			
			let fileMaxSize = 1000;
			
			let formData = new FormData();
			
			formData.append('albumId', this.albumId.toString());
			
			photos.forEach((photo: File) => {
				
				if(photo.size > (fileMaxSize * 1000)){
					
					this.uploadErrorMessage.push(`The file size cannot exceed ${fileMaxSize} Kb`);
					
					return;
				}
				
				if(!photo.type.includes('image')){
					
					this.uploadErrorMessage.push("Incorrect file format");
					
					return;
				}
				
				formData.append("photos", photo);
			});
			
			this.uploadPhotos(formData);
			
		}
	}
	
	
	private uploadPhotos(data: FormData){
		
		this.albumService.uploadPhotos(data).subscribe(event => {

			if(event.type === HttpEventType.UploadProgress){

				if(event.total){

					const total: number = event.total;

					this.uploadProgress = Math.round(100 * event.loaded / total);
				}
			}

			if(event instanceof HttpResponse){

				this.uploadProgress = 0;

				event.body.forEach((v: any) => this.photos.unshift(v));
					
				alert("Photos uploaded successfully");
			}
		},
			
		error => {

			this.uploadProgress = 0;

			this.uploadErrorMessage.length = 0;

			if(Array.isArray(error['error'].errors)){

				error['error'].errors.forEach((v: any) => {this.uploadErrorMessage.push(v)});
			}

			else this.uploadErrorMessage.push(error['error'].Message);
			}
		);
	}
	
	
	deletePhoto(event: any, id: number, index: number){

		if(confirm("Are you sure to delete?")) {
			
			event.target.disabled = true;
			
			this.albumService.deletePhoto(this.albumId, id).subscribe((result: any) => {

				this.photos.splice(index, 1);

				alert(result['message']);
			},
				
			error => {

				alert(error['error'].Message);

				event.target.disabled = false;
			});
		}
	}
	
	
	private getPhotos(){
		
		let offset = this.photos ? this.photos.length : 0;
		
		this.albumService.getUserAlbumPhotos(this.albumId, offset, this.photosLimit).subscribe((result: any) => {

			if (!this.photos) this.photos = [];

			result['data'].forEach((v: any) => this.photos.push(v));

			this.photosHasNextPage = result['pagination'].hasNextPage;

			this.loadButtonClicked = false;
		});
	}


	ngOnDestroy(): void {

		this.paramsSubscription.unsubscribe();
	}
}
