import { Component, OnInit } from '@angular/core';
import {PostsList} from "../../../shared/models/posts-list";
import {PostsService} from "../../../shared/services/posts.service";



@Component({
	selector: 'app-posts-list',
    templateUrl: './posts-list.component.html'
})
export class PostsListComponent implements OnInit {
	
	posts!: PostsList[];
	private postsLimit: number = 6;
	hasNextPage: boolean = false;
	loadButtonClicked: boolean = false;
	
	
	constructor(private postsService: PostsService) { }
	
	
	ngOnInit(): void { this.getPosts(); }
	
	
	loadPosts(){
		
		if(this.hasNextPage){
			
			this.loadButtonClicked = true;
			
			this.getPosts();
		}
	}
	
	
	private getPosts(){
		
		let offset = this.posts ? this.posts.length : 0;
		
		this.postsService.getPostsList(offset, this.postsLimit, 0).subscribe((result: any) => {

			if(!this.posts) this.posts = [];

			result['data'].forEach((v: any) => this.posts.push(v))

			this.hasNextPage = result['pagination'].hasNextPage;

			this.loadButtonClicked = false;
		});
	}
}
