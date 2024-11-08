import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtTokenService } from "../auth/jwt/jwt-token.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private categoryUrl = `${environment.backendUrl}/category`;

  private token: string | null = "";

  constructor(
    private http: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.token = this.jwtTokenService.getToken();
  }

  getAllCategories(page: number = 0, size: number = 100): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get(this.categoryUrl, { headers, params });
  }
}
