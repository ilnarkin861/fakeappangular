import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AccountPostsService } from "../../services/account-posts.service";
import { UserPost } from "../../models/user-post";



@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html'
})
export class PostEditComponent implements OnInit, OnDestroy {
	
	private paramsSubscription!: Subscription;
	private postId!: number;
	post!: UserPost;
	postNotFound: boolean = false;
	

  	constructor(private postsService: AccountPostsService, private activatedRoute: ActivatedRoute) {

		this.paramsSubscription = activatedRoute.params.subscribe(params => this.postId = params['id']);
	}
	

	ngOnInit(): void {
  		this.postsService.userPostDetails(this.postId).subscribe((result: any) => {

  			this.post = result;
		},
			
		error => {

  			if(error['error'].StatusCode == 404) this.postNotFound = true;
		});
	}
	
	
	ngOnDestroy(): void {

		this.paramsSubscription.unsubscribe();
	}
}