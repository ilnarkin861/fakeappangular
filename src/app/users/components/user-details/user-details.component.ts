import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { PostsList } from "../../../shared/models/posts-list";
import { AlbumsList } from "../../../shared/models/albums-list";
import { UsersService } from "../../../shared/services/users.service";
import { PostsService } from "../../../shared/services/posts.service";
import { AlbumService } from "../../../shared/services/album.service";
import { UserDetails } from "../../models/user-details";



@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    
    private paramsSubscription!: Subscription;
    private userSubscription!: Subscription;
    private userId!: number;
    userNameTitle!: string;
    user!: UserDetails;
    postsList: PostsList [] = [];
    albumsList: AlbumsList [] = [];
    private postsLimit: number = 6;
    private albumsLimit: number = 8;
    hasPostsNextPage!: boolean;
    hasAlbumsNextPage!: boolean;
    loadPostsButtonClicked: boolean = false;
    loadAlbumsButtonClicked: boolean = false;
    userNotFound: boolean = false;
    
    
    constructor(private titleService: Title,
                private activatedRoute: ActivatedRoute,
                private usersService: UsersService,
                private postsService: PostsService,
                private albumService: AlbumService) {
    
        this.paramsSubscription = activatedRoute.params.subscribe(params => this.userId = params['id']);
        
    }
    
    
    ngOnInit(): void {

        this.userSubscription = this.usersService.getUserDetails(this.userId).subscribe((user: any) =>{

            this.user = user;

            this.titleService.setTitle(this.user.lastName
                ? `${this.user.firstName} ${this.user.lastName}`
                : this.user.firstName);

            this.userNameTitle = this.user.lastName
                ? `${this.user.firstName} ${this.user.lastName}`
                : this.user.firstName;

            this.getUserPosts();

            this.getUserAlbums();
        },

        (error) => {

            if(error['error'].StatusCode == 404){

                this.userNotFound = true;

                this.titleService.setTitle("User not found")
            }
        });
    }
    
    
    private getUserPosts(){
        
        this.postsService.getPostsList(this.postsList.length, this.postsLimit, this.userId)
            .subscribe((result: any) => {
                
                result['data'].forEach((v: any) => this.postsList.push(v));
                
                this.hasPostsNextPage = result['pagination'].hasNextPage;
                
                this.loadPostsButtonClicked = false;
            }
        );
    }
    
    
    private getUserAlbums(){
        
        this.albumService.getAlbumsList(this.albumsList.length, this.albumsLimit, this.userId)
            .subscribe((result: any) => {

                result['data'].forEach((v: any) => this.albumsList.push(v));

                this.hasAlbumsNextPage = result['pagination'].hasNextPage;

                this.loadAlbumsButtonClicked = false;
            }
        );
    }
    
    
    loadUserPosts(){
        
        if(this.hasPostsNextPage){
            
            this.loadPostsButtonClicked = true;
            
            this.getUserPosts();
        }
    }
    
    
    loadUserAlbums(){
        
        if (this.hasAlbumsNextPage){
            
            this.loadAlbumsButtonClicked = true;
            
            this.getUserAlbums();
        }
    }
    
    
    ngOnDestroy(): void {

        this.paramsSubscription.unsubscribe();
        
        this.userSubscription.unsubscribe();
    }
}
