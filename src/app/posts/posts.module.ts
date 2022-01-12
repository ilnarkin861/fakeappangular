import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';



const routes: Routes = [

    {
        path: '',
        component: PostsListComponent,
        data: {title: "Posts"}
    },

    {
        path: ':id',
        component: PostDetailsComponent
    }
]


@NgModule({
    declarations: [
        PostsListComponent,
        PostDetailsComponent,
    ],
	
    imports: [
        CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
        RouterModule.forChild(routes),
    ]
})
export class PostsModule { }
