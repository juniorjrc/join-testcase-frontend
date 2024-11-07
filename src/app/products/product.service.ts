import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtTokenService } from "../auth/jwt/jwt-token.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsUrl = `${environment.backendUrl}/product`;

  private token: string | null = "";

  constructor(
    private http: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.token = this.jwtTokenService.getToken();
  }

  getAllProducts(page: number = 0, size: number = 10): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get(this.productsUrl, { headers, params });
  }
}
