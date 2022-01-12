import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { PostItemComponent } from './components/post-item/post-item.component';
import { AlbumItemComponent } from './components/album-item/album-item.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
	declarations: [
		PostItemComponent,
		AlbumItemComponent,
		UserItemComponent,
		AlertComponent
	],
	
	exports: [
		PostItemComponent,
		AlbumItemComponent,
		UserItemComponent,
		AlertComponent
	],
	
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule
	]
})
export class SharedModule { }
