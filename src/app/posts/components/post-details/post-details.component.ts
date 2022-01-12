import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { FormGroup } from "@angular/forms";
import * as signalR from '@microsoft/signalr';
import { HubConnection, LogLevel } from '@microsoft/signalr';
import { ActivatedRoute } from "@angular/router";
import { PostDetails } from "../../../shared/models/post-details";
import { PostsService } from "../../../shared/services/posts.service";
import { CommentsList } from "../../models/comments-list";
import { AuthService } from "../../../auth/services/auth.service";
import { CommentsForm } from "../../forms/comments-form";



@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html'
})
export class PostDetailsComponent implements OnInit, OnDestroy {
	
	private paramsSubscription!: Subscription;
	private postSubscription!: Subscription;
	private hubConnection!: HubConnection;
	isAuthenticated: boolean = false;
	private postId!: number;
	postTitle!: string;
	post!: PostDetails;
	postNotFound: boolean = false;
	loadButtonClicked: boolean = false;
	commentsList: CommentsList[] = [];
	commentsForm: FormGroup = new CommentsForm().form;
	hasCommentsNextPage!: boolean;
	commentsButtonClicked: boolean = false;
	messages: string [] = []

    
    constructor(private titleService: Title,
				private activatedRoute: ActivatedRoute,
				private postsService: PostsService,
				private authService: AuthService) {
	
		this.paramsSubscription = activatedRoute.params.subscribe(params => this.postId = params['id']);
		
		this.isAuthenticated = authService.isAuthenticated();
	}
	
	
	ngOnInit(): void {
    	
    	this.hubInit();
    	
    	this.postSubscription = this.postsService.getPostDetails(this.postId).subscribe((result: any) => {

    		this.post = result;

    		this.titleService.setTitle(this.post.title);

    		this.postTitle = this.post.title;

    		this.commentsForm.get('postId')?.setValue(this.postId);
				
    		this.getComments();
		},
			
		(error) => {

    		if(error['error'].StatusCode == 404){

    			this.titleService.setTitle("Post not found");

    			this.postNotFound = true;
			}
		});
    }
	
	
	loadComments(){
    	
    	if(this.hasCommentsNextPage){
			
    		this.loadButtonClicked = true;
			
			this.getComments();
		}
	}
	
	
	addComment(){
    	
    	this.isAuthenticated = this.authService.isAuthenticated();
    	
    	if(this.isAuthenticated){

			this.commentsForm.markAllAsTouched();
		
			if(this.commentsForm.valid) {
				
				this.commentsButtonClicked = true;
				
				this.messages.length = 0;
				
				this.postsService.addComment(this.commentsForm.value).subscribe(() => {

					this.commentsForm.get('body')?.reset();

					this.commentsButtonClicked = false;
				},

				error => {

					if(Array.isArray(error['error'].errors)){

						error['error'].errors.forEach((v: any) => {this.messages.push(v)});
					}

					else this.messages.push(error['error'].Message);
					}
				);
			}
		}
    }

	
	
	ngOnDestroy(): void {
    	
    	this.paramsSubscription.unsubscribe();
    	
    	this.postSubscription.unsubscribe();
	}
	
	
	private getComments(){
		
		this.postsService.getPostCommentsList(this.postId, this.commentsList.length, 5).subscribe(
			(result: any) => {
				
				result['data'].forEach((v: any) => this.commentsList.unshift(v))
				
				this.hasCommentsNextPage = result['pagination'].hasNextPage;
				
				this.loadButtonClicked = false;
			}
		);
	}
	
	
	private hubInit(){
		
		this.hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(`${environment.apiUrl}/posts/comments/notify`)
			.configureLogging(LogLevel.Error)
			.withAutomaticReconnect()
			.build();
		
		this.hubConnection.start().then();
		
		this.hubConnection.on("Notify", (data: any) => {
			
			this.commentsList.push(data);
			
			this.post.commentsCount++;
		});
	}
}
