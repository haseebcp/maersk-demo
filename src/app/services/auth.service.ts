import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  islogInSubject = new BehaviorSubject<boolean>(false);
  constructor(private router:Router) { }

  hasToken(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken():string {
    return localStorage.getItem("token") || null;
  }

  login(token: string): void {
    localStorage.setItem("token", token)
    this.islogInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem("token")
    this.islogInSubject.next(false);
    this.router.navigate(["login"]);
  }

  isLoggedIn():Observable<boolean> {
    return this.islogInSubject.asObservable();
  }
}
