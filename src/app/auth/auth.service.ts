import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loginUrl = `${environment.backendUrl}/login`;

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.checkLoginStatus()
  );

  constructor(private http: HttpClient, private router: Router) {}

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private checkLoginStatus(): boolean {
    const token = localStorage.getItem("authToken");
    return token ? true : false;
  }

  login(loginData: { login: string; password: string }): Observable<any> {
    return this.http
      .post<any>(this.loginUrl, loginData, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem("authToken", response.token);
            this.isLoggedInSubject.next(true);
          }
        })
      );
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.router.navigate(["/login"]);
  }
}
