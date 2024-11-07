import { MatPaginator } from "@angular/material/paginator";
import { ProductService } from "../product.service";
import { JwtTokenService } from "./../../auth/jwt/jwt-token.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products = new MatTableDataSource<any>();
  displayedColumns: string[] = ["id", "name", "description", "category", "price", "actions"];
  totalElements = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private jwtTokenService: JwtTokenService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.jwtTokenService.checkToken();
    this.getAllProducts();
    this.products.paginator = this.paginator;
  }

  logout() {
    this.authService.logout();
  }

  getAllProducts(page: number = 0, size: number = 10) {
    this.productService.getAllProducts(page, size).subscribe((response) => {
      this.products.data = response.content;
      this.totalElements = response.totalElements;
    });
  }

  onPageChange(event: any) {
    this.getAllProducts(event.pageIndex, event.pageSize);
  }

  openAddProductDialog() {
  }

  editProduct(product: any) {
  }

  deleteProduct(productId: number) {
  }
}
