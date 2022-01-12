import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { SharedModule } from "../shared/shared.module";


const routes: Routes = [
    {
        path: '',
        component: UsersListComponent,
        data: {title: "All users"}
    },

    {
        path: ':id',
        component: UserDetailsComponent
    }
];


@NgModule({
    declarations: [
        UsersListComponent,
        UserDetailsComponent
    ],

    imports: [
        CommonModule,
        RouterModule.forChild(routes),
		SharedModule
    ]
})
export class UsersModule { }
