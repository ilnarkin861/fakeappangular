import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from "./layouts/error404/error404.component";
import { IndexComponent } from "./index/index.component";



const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        component: IndexComponent,
        data: {title: "Main page"}

    },

    {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
    },

    {
        path: 'albums',
        loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule)
    },

    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },

    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    },

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },

    {
        path: '**',
        component: Error404Component,
        data: {title: "Page not found"}
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        initialNavigation: 'enabled',
        paramsInheritanceStrategy: 'always'
    })],

    exports: [RouterModule]
})
export class AppRoutingModule { }
