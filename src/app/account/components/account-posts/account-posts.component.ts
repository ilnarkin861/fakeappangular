import { Component, OnInit } from '@angular/core';
import { AccountPostsService } from "../../services/account-posts.service";
import { UserPost } from "../../models/user-post";



@Component({
    selector: 'app-account-posts',
    templateUrl: './account-posts.component.html'
})
export class AccountPostsComponent implements OnInit {

	posts!: UserPost[];
	private postsLimit: number = 5;
	hasNextPage: boolean = false;
	buttonClicked: boolean = false;
	
	
  	constructor(private postsService: AccountPostsService) { }

	
  	ngOnInit(): void { this.getPosts();	}
  	
  	
  	loadPosts(){
  		
  		if(this.hasNextPage){
  			
  			this.buttonClicked = true;
		  
			this.getPosts();
		}
	}
	
	
	deletePost(event: any, id: number, index: number){

  		if(confirm("Are you sure to delete?")){
		  
			event.target.disabled = true;
			
			this.postsService.deletePost(id).subscribe((result: any) => {

				this.posts.splice(index, 1);

				alert(result['message']);
			},

			error => {

				alert(error['error'].Message);

				event.target.disabled = false;
			});
		}
	}
	
	
	private getPosts(){
		
  		let offset = this.posts ? this.posts.length : 0;
  		
		this.postsService.getUserPosts(offset, this.postsLimit).subscribe((result: any) => {

			if(!this.posts)	this.posts = [];

			result['data'].forEach((v: any) => this.posts.push(v));

			this.hasNextPage = result['pagination'].hasNextPage;

			this.buttonClicked = false;
		});
	}
}
