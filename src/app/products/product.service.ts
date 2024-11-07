import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtTokenService } from "../auth/jwt/jwt-token.service";

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

  createProduct(product: any): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    return this.http.post<any>(`${this.productsUrl}`, product, { headers });
  }

  updateProduct(product: any): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    return this.http.put<any>(`${this.productsUrl}/${product.id}`, product, {
      headers,
    });
  }

  deleteProduct(productId: number) {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    return this.http.delete<any>(`${this.productsUrl}/${productId}`, {
      headers,
    });
  }
}
