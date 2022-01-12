import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { AlbumForm } from "../../forms/album-form";
import { UserAlbum } from "../../models/user-album";
import { AccountAlbumsService } from "../../services/account-albums.service";



@Component({
    selector: 'app-album-form',
    templateUrl: './album-form.component.html'
})
export class AlbumFormComponent implements OnInit {

	@Input() album!: UserAlbum;
	albumForm: FormGroup = new AlbumForm().form;
	uploadedCover!: string;
	private cover!: File;
	changedCover!: string;
	coverError!: string;
	messages: string [] = [];
	success: boolean = false;
	buttonClicked: boolean = false;
	
	
  	constructor(private albumService: AccountAlbumsService, private router: Router) { }

	
  	ngOnInit(): void { if(this.album) this.initialForm(this.album); }
	
	
	coverSelected(event: any){
  
		if (event.target.files.length > 0){
			
			this.cover = event.target.files[0];
			
			this.changedCover = this.cover.name;
			
			let fileMaxSize = 1000;
			
			this.coverError = "";
			
			if(this.cover.size > (fileMaxSize * 1000)) {
				this.coverError = `The file size cannot exceed ${fileMaxSize} Kb`;
			}
			
			if(!this.cover.type.includes('image')) this.coverError = "Incorrect file format";
		}
	}
	
	
	submitForm(){
  		
  		this.albumForm.markAllAsTouched();
  		
  		if(this.albumForm.valid){
  			
  			this.buttonClicked = true;
  			
  			if(!this.album) this.addAlbum();
  			
  			else this.editAlbum();
		}
	}
	
	
	private addAlbum(){

  		this.albumService.addAlbum(this.initialFormData()).subscribe(
			
  			() => this.router.navigate(['/account/albums']),
			
			error => {
  		
				this.getErrorMessages(error);
				
				this.buttonClicked = false;
			}
		);
	}
	
	
	private editAlbum(){
  		
  		this.albumService.updateAlbum(this.initialFormData()).subscribe((result: any) => {

  			this.initialForm(result);

  			this.success = true;

  			this.messages.push("Post updated successfully");

  			this.buttonClicked = false;

  			this.albumForm.get('cover')?.reset();

  			this.changedCover = '';

  			setTimeout(() => this.messages.length = 0, 3000);
		},

		error => {

  			this.success = false;

  			this.getErrorMessages(error);

  			this.buttonClicked = false;
		});
	}
	
	
	private initialForm(album: any){
  		
  		this.albumForm.get('id')?.setValue(album.id);
  		this.albumForm.get('title')?.setValue(album.title);
  		
  		if(album.cover){
  			this.uploadedCover = album.cover;
		}
	}
	
	
	private initialFormData(): FormData{
		
		let formData = new FormData();
		
		formData.append('id', this.albumForm.get('id')?.value);
		formData.append('title', this.albumForm.get('title')?.value);
		
		if(this.cover) formData.append('cover', this.cover);
		
		return formData;
	}
	
	
	private getErrorMessages(messages: any){
		
		this.messages.length = 0;
		
		if(Array.isArray(messages['error'].errors)){

			messages['error'].errors.forEach((v: any) => {this.messages.push(v)});
		}

		else this.messages.push(messages['error'].Message);
	}
}
