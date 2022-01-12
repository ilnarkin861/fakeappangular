import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserPost } from "../../models/user-post";
import { PostForm } from "../../forms/post-form";
import { AccountPostsService } from "../../services/account-posts.service";



@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit {
	
	@Input() post!: UserPost;
	postForm = new PostForm().form;
	uploadedImage!: string;
	image!: File;
	changedImage!: string;
	imageError!: string;
	messages: string [] = []
	success: boolean = false;
	buttonClicked: boolean = false;
	

  	constructor(private postsService: AccountPostsService, private router: Router) { }
	

	ngOnInit(): void { if(this.post) this.initialForm(this.post); }
	
	
	postImageSelected(event: any){
  		
  		if (event.target.files.length > 0){
		  
			this.image = event.target.files[0];
			
			this.changedImage = this.image.name;
		 
			let fileMaxSize = 1000;
			
			this.imageError = "";
		 
			if(this.image.size > (fileMaxSize * 1000)){
				this.imageError = `The file size cannot exceed ${fileMaxSize} Kb`
			}
		 
			if(!this.image.type.includes('image')){
				this.imageError = "Incorrect file format";
			}
		}
	}
	
	
	submitForm(){
  		
  		this.postForm.markAllAsTouched();
  		
  		if(this.postForm.valid){
  			
  			this.buttonClicked = true;
  		
			if(!this.post) this.addPost();
		 
			else this.editPost();
		}
	}
	
	
	private addPost(){
  		
  		this.postsService.addPost(this.initialFormData()).subscribe(
			
  			() => this.router.navigate(['/account/posts']),
			
			error => {
				
				this.getErrorMessages(error);
				
				this.buttonClicked = false;
			}
		);
	}
	
	
	private editPost(){
  		this.postsService.updatePost(this.initialFormData()).subscribe((result: any) => {

  			this.initialForm(result);

  			this.success = true;

  			this.messages.push("Post updated successfully");

  			this.buttonClicked = false;

  			this.postForm.get('image')?.reset();

  			this.changedImage = '';

  			setTimeout(() => this.messages.length = 0, 3000);
		},
			
		error => {

  			this.success = false;

  			this.getErrorMessages(error);
				
			this.buttonClicked = false;
		});
	}
	
	
	private initialForm(post: any){
  		
  		this.postForm.get('id')?.setValue(post.id);
  		this.postForm.get('title')?.setValue(post.title);
  		this.postForm.get('body')?.setValue(post.body);
  		
  		if(post.image) this.uploadedImage = post.image;
	}
	
	private initialFormData(): FormData{
  		
  		let formData = new FormData();
  		
  		formData.append('id', this.postForm.get('id')?.value);
  		formData.append('title', this.postForm.get('title')?.value);
  		formData.append('body', this.postForm.get('body')?.value);
  		
  		if(this.image) formData.append('image', this.image);

  		return formData;
	}
	
	
	private getErrorMessages(messages: any){
  		
  		this.messages.length = 0;
		
		if(Array.isArray(messages['error'].errors)){

			messages['error'].errors.forEach((v: any) => { this.messages.push(v); });
		}
		
		else this.messages.push(messages['error'].Message);
	}
}
