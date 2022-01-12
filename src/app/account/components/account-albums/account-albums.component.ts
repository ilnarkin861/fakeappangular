import { Component, OnInit } from '@angular/core';
import { UserAlbum } from "../../models/user-album";
import { AccountAlbumsService } from "../../services/account-albums.service";



@Component({
    selector: 'app-account-albums',
    templateUrl: './account-albums.component.html'
})
export class AccountAlbumsComponent implements OnInit {

	albums!: UserAlbum [];
	private albumsLimit: number = 6;
	hasNextPage: boolean = false;
	buttonClicked: boolean = false;
	
	
  	constructor(private albumService: AccountAlbumsService) { }
	

  	ngOnInit(): void { this.getAlbums(); }
	
	
	loadAlbums(){
  		
  		if(this.hasNextPage){
  			
  			this.buttonClicked = true;
  			
  			this.getAlbums();
		}
	}
	
	
	deleteAlbum(event: any, id: number, index: number){
		
		if(confirm("Are you sure to delete?")){
			
			event.target.disabled = true;
			
			this.albumService.deleteAlbum(id).subscribe((result: any) => {

				this.albums.splice(index, 1);

				alert(result['message']);
			},
				
			error => {

				alert(error['error'].Message);

				event.target.disabled = false;
			});
		}
	}

	
	private getAlbums(){
  		
  		let offset = this.albums ? this.albums.length : 0;
  		
  		this.albumService.getUserAlbums(offset, this.albumsLimit).subscribe((result: any) => {

  			if(!this.albums) this.albums = [];

  			result['data'].forEach((v: any) => this.albums.push(v));

  			this.hasNextPage = result['pagination'].hasNextPage;

  			this.buttonClicked = false;
		});
	}
}
