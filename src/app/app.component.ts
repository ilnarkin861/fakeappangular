import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{


    constructor(private titleService: Title,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }


    ngOnInit() {

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
        ).subscribe(() => {
            const childRoute = this.getChild(this.activatedRoute);
            childRoute.data.subscribe((data: any) => {
                if (data.title) this.titleService.setTitle(data.title)
            });
        });
    }


    private getChild(activatedRoute: ActivatedRoute) : any {

        return  activatedRoute.firstChild ? this.getChild(activatedRoute.firstChild) : activatedRoute;
    }
}
