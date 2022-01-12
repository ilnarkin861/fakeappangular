import { Component, Input } from '@angular/core';
import { PostsList } from "../../models/posts-list";



@Component({
	selector: 'app-post-item',
	templateUrl: './post-item.component.html',
})
export class PostItemComponent {
	
	@Input() posts!: PostsList [];

}
