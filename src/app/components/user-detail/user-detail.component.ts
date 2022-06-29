import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { User} from 'src/app/models/response.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit,OnDestroy {

  constructor(private route:ActivatedRoute,
    public apiService: ApiService,
    public loaderService: NgxUiLoaderService,
     ) { }
  userId:number;
  user:User | null;
  userDetails$:Subscription;
  isLoading:boolean = true;
  ngOnInit(): void {
    this.apiService.isLodingSubect.next(true);
    this.loaderService.start();
    this.route.params.subscribe(params => {
         this.userId = params.id;
    });
    this.userDetails$ = this.apiService.getUserDetails(this.userId)
    .subscribe(userData => {
        this.user = userData.data || null;
        this.loaderService.stop();
    })
    this.apiService.isLoading()
    .subscribe(value => this.isLoading = value)
  }
  
  ngOnDestroy(): void {
    this.userDetails$?.unsubscribe();
  }
}
