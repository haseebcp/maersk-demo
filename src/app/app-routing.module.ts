import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';
import { NoDataComponent } from './partials/no-data/no-data.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"user",
    component:UserListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"user/:id",
    component:UserDetailComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"404",
    component:NoDataComponent
  },
  {
    path:"**",
    component:NoDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
