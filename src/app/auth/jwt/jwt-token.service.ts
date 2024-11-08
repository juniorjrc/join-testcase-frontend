import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class JwtTokenService {
  constructor(private router: Router) {}

  setToken(response: any) {
    const oneHour = 60 * 60 * 1000;
    localStorage.setItem("authToken", response.token);
    const expirationTime = new Date().getTime() + oneHour;
    localStorage.setItem("tokenExpiration", expirationTime.toString());
  }

  checkToken() {
    const token = localStorage.getItem("authToken");
    const tokenExpirationTime = localStorage.getItem("tokenExpiration");
    if (!token || !tokenExpirationTime) {
      this.router.navigate(["/login"]);
      return;
    }
  }

  getToken() {
    return localStorage.getItem("authToken");
  }
}
