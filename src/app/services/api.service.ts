import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/request.model';
import { LoginResponse,UserDetailResponse, UserListResponse } from '../models/response.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isLodingSubect = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) { }
  
  isLoading():Observable<boolean> {
    return this.isLodingSubect.asObservable();
  }

  login(user:LoginRequest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiURL}/login`,user)
  }

  getUserList(page:number):Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${environment.apiURL}/users?page=${page}`)
  }
  getUserDetails(userId:number):Observable<UserDetailResponse> {
    return this.http.get<UserDetailResponse>(`${environment.apiURL}/users/${userId}`)
  }
  
}
