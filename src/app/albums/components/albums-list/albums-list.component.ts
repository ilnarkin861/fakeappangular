import { Component, OnInit } from '@angular/core';
import { AlbumsList } from "../../../shared/models/albums-list";
import { AlbumService } from "../../../shared/services/album.service";



@Component({
    selector: 'app-albums-list',
    templateUrl: './albums-list.component.html'
})
export class AlbumsListComponent implements OnInit {
	
	albums!: AlbumsList [];
	private albumsLimit: number = 8;
	hasNextPage: boolean = false;
	loadButtonClicked: boolean = false;
	

	constructor(private albumsService: AlbumService) { }
	
	
	ngOnInit(): void { this.getAlbums(); }
	
	
	loadAlbums(){

		this.loadButtonClicked = true;
		
		if(this.hasNextPage) this.getAlbums();
	}
	
	
	private getAlbums(){
		
		let offset = this.albums ? this.albums.length : 0;
		
		this.albumsService.getAlbumsList(offset, this.albumsLimit, 0).subscribe((result: any) => {

			if(!this.albums) this.albums = [];

			result['data'].forEach((v: any) => this.albums.push(v));

			this.hasNextPage = result['pagination'].hasNextPage;

			this.loadButtonClicked = false;
		});
	}
}
