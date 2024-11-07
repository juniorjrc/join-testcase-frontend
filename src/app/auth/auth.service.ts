import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loginUrl = `${environment.backendUrl}/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: { login: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData, {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    });
  }

  logout() {
    this.router.navigate(["/login"]);
  }
}
