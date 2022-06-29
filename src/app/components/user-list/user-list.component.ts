import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { User, UserListResponse } from 'src/app/models/response.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy {

  constructor(public apiService:ApiService,
    public router:Router,
    public loaderService: NgxUiLoaderService) { }
  
  userList:Array<User>;
  totalItems:number;
  perPage:number;
  userList$:Subscription
  ngOnInit(): void {
    this.getUserList(1);
  }

  getUserList(page:number) {
    this.loaderService.start();
    this.userList$ = this.apiService.getUserList(page)
    .subscribe((users: UserListResponse) => {
          this.totalItems = users.total;
          this.perPage = users.per_page;
          this.userList = users.data;
          this.loaderService.stop();
    })
  }

  goToUserDetils(id:number):void {
    this.router.navigate(["user",id])

  }
  pageChanged(page) {
    this.getUserList(page)
  }
  ngOnDestroy(): void {
    this.userList$?.unsubscribe();
  }

}
