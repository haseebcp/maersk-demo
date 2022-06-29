import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './http-interceptor/auth.interceptor';
import { GlobalErrorHandler } from './error-handler/errorhandler';
import { ToastrModule } from 'ngx-toastr';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { HeaderComponent } from './partials/header/header.component';
import { NoDataComponent } from './partials/no-data/no-data.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { PaginationComponent } from './partials/pagination/pagination.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserDetailComponent,
    HeaderComponent,
    NoDataComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:ErrorHandler,useClass:GlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
