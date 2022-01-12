import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { AccountMainComponent } from './components/account-main/account-main.component';
import { AccountPostsComponent } from './components/account-posts/account-posts.component';
import { AccountAlbumsComponent } from './components/account-albums/account-albums.component';
import { AccountTodosComponent } from './components/account-todos/account-todos.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { AlbumFormComponent } from './components/album-form/album-form.component';
import { PostAddComponent } from './components/post-add/post-add.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { AlbumAddComponent } from './components/album-add/album-add.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../auth/guards/auth.guard";



const routes: Routes = [

    {
        path: '',
        component: AccountMainComponent,
		canActivate: [AuthGuard],
        data: {title: "My account"}
    },

    {
        path: 'posts',
        children: [
            {
                path: '',
                component: AccountPostsComponent,
				canActivate: [AuthGuard],
                data: {title: "My posts"}
            },

            {
                path: 'add',
                component: PostAddComponent,
				canActivate: [AuthGuard],
                data: {title: "Add post"}
            },

            {
                path: 'edit/:id',
                component: PostEditComponent,
				canActivate: [AuthGuard],
                data: {title: "Edit post"}
            },
        ]
    },

    {
        path: 'albums',
        children: [
            {
                path: '',
                component: AccountAlbumsComponent,
				canActivate: [AuthGuard],
                data: {title: "My albums"}
            },
            {
                path: 'add',
                component: AlbumAddComponent,
				canActivate: [AuthGuard],
                data: {title: "Add album"}
            },

            {
                path: 'edit/:id',
                component: AlbumEditComponent,
				canActivate: [AuthGuard],
                data: {title: "Edit album"}
            },
        ]
    },

    {
        path: 'todos',
        component: AccountTodosComponent,
        data: {title: "My todos"}
    }
];


@NgModule({

    declarations: [
        AccountMenuComponent,
        AccountMainComponent,
        AccountPostsComponent,
        AccountAlbumsComponent,
        AccountTodosComponent,
        PostFormComponent,
        AlbumFormComponent,
        PostAddComponent,
        PostEditComponent,
        AlbumAddComponent,
        AlbumEditComponent
    ],
	
	providers: [
		AuthGuard
	],
	
	
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class AccountModule { }
