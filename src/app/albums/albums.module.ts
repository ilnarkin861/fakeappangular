import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LightboxModule } from "ngx-lightbox";
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { SharedModule } from "../shared/shared.module";



const routes: Routes = [
    {
        path: '',
        component: AlbumsListComponent,
        data: {title: "All albums"}
    },

    {
        path: ':id',
        component: AlbumDetailsComponent
    }
]


@NgModule({
    declarations: [
        AlbumsListComponent,
        AlbumDetailsComponent
    ],

    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LightboxModule,
		SharedModule
    ]
})
export class AlbumsModule { }
