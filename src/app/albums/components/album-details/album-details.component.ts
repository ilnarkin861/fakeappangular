import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import { Lightbox, LightboxConfig } from "ngx-lightbox";
import { AlbumService } from "../../../shared/services/album.service";
import { AlbumDetails } from "../../../shared/models/album-details";



@Component({
    selector: 'app-album-details',
    templateUrl: './album-details.component.html'
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
    
    private paramsSubscription!: Subscription;
    private albumSubscription!: Subscription;
    private albumId!: number;
    albumTitle!: string;
    album!: AlbumDetails;
    photosList: Array<any> = [];
    private photosLimit: number = 8;
    hasPhotosNextPage!: boolean;
    loadButtonClicked: boolean = false;
    albumNotFound: boolean = false;
    
    
    constructor(private titleService: Title,
                private activatedRoute: ActivatedRoute,
                private albumsService: AlbumService,
                private lightbox: Lightbox,
                private lightboxConfig: LightboxConfig){
    
        this.paramsSubscription = activatedRoute.params.subscribe(params => this.albumId = params['id']);
        
        this.lightboxConfig.showImageNumberLabel = true;
        this.lightboxConfig.albumLabel = "Photo %1 of %2";
    }
    
    
    ngOnInit(): void {
        
        this.albumSubscription = this.albumsService.getAlbumDetails(this.albumId).subscribe((result:any) => {

            this.album = result;

            this.titleService.setTitle(this.album.title);

            this.albumTitle = this.album.title;

            this.getPhotos();

        },

        (error) => {

            if(error['error'].StatusCode === 404){

                this.titleService.setTitle("Album not found");

                this.albumNotFound = true;
            }
         });
    }
    
    
    loadPhotos(){

        if (this.hasPhotosNextPage){
            
            this.loadButtonClicked = true;
    
            this.getPhotos();
        }
    }
    
    
    private getPhotos(){
    
        this.albumsService.getPhotos(this.albumId, this.photosList.length, this.photosLimit)
            .subscribe((photos: any) =>{
    
                if(!this.photosList) this.photosList = [];
    
                photos['data'].forEach((photo: any) => this.photosList.push({src: photo.url}));
                
                this.hasPhotosNextPage = photos['pagination'].hasNextPage;
                
                this.loadButtonClicked = false;
            }
        );
    }
    
    
    openGallery(index: number) : void{

        this.lightbox.open(this.photosList, index);
    }
    
    
    ngOnDestroy(): void {

        this.paramsSubscription.unsubscribe();

        this.albumSubscription.unsubscribe();
    }
}
