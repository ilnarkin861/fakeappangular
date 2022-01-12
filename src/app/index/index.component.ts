import { Component, OnInit } from '@angular/core';
import { PostsService } from "../shared/services/posts.service";
import { PostsList } from "../shared/models/posts-list";
import { AlbumsList } from "../shared/models/albums-list";
import { UsersList } from "../shared/models/users-list";
import { AlbumService } from "../shared/services/album.service";
import { UsersService } from "../shared/services/users.service";



@Component({
    selector: 'app-index',
    templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
	
	postsCount!: number;
	albumsCount!: number;
	usersCount!: number;
	posts!: PostsList [];
	albums!: AlbumsList [];
	users!: UsersList [];
	
    
    constructor(private postsService: PostsService,
				private albumsService: AlbumService,
				private usersService: UsersService) { }
    
    
    ngOnInit(): void {
    	
    	let postOffset = this.posts ? this.posts.length : 0;
    	let albumOffset = this.albums ? this.albums.length : 0;
    	let userOffset = this.users ? this.users.length : 0;
    	
    	this.postsService.getPostsList(postOffset, 3, 0).subscribe((result: any) => {
    		
    		if (!this.posts) this.posts = [];
			   
    		this.posts = result['data'];
    		
    		this.postsCount = result['pagination'].count;
		});
	
		this.albumsService.getAlbumsList(albumOffset, 8, 0).subscribe((result: any) => {
			
			if (!this.albums) this.albums = [];
			
			this.albums = result['data'];
			
			this.albumsCount = result['pagination'].count;
		});
	
		this.usersService.getUsersList(userOffset, 3).subscribe((result: any) => {
			
			if (!this.users) this.users = [];
			
			this.users = result['data'];
			
			this.usersCount = result['pagination'].count;
		});
    }
}
