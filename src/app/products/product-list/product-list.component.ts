import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "src/app/auth/auth.service";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog/confirmation-dialog.component";
import { NotificationService } from "src/app/shared/notification.service";
import { AddProductDialogComponent } from "../add-product-dialog/add-product-dialog.component";
import { ProductService } from "../product.service";
import { JwtTokenService } from "./../../auth/jwt/jwt-token.service";
import { CategoryService } from "./../../categories/category.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products = new MatTableDataSource<any>();
  categories = [];
  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "category",
    "price",
    "actions",
  ];
  totalElements = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private jwtTokenService: JwtTokenService,
    private productService: ProductService,
    private authService: AuthService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.jwtTokenService.checkToken();
    this.getAllProducts();
    this.getAllCategories();
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator;

    this.paginator.page.subscribe((event) => {
      this.onPageChange(event);
    });
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

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((response) => {
      this.categories = response.content;
    });
  }

  onPageChange(event: any) {
    this.getAllProducts(event.pageIndex, event.pageSize);
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: "400px",
      data: { product: null, categories: this.categories },
    });

    dialogRef.afterClosed().subscribe((product) => {
      if (product && product !== "cancel") {
        this.productService.createProduct(product).subscribe(
          (_) => {
            this.notificationService.showSuccess(
              "Product created successfully!"
            );
            this.getAllProducts();
          },
          (error) => {
            this.notificationService.showError(`ERROR: ${error.error.message}`);
          }
        );
      }
    });
  }

  editProduct(product: any) {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: "400px",
      data: { product, categories: this.categories },
    });

    dialogRef.afterClosed().subscribe((upToDateProduct) => {
      console.log(upToDateProduct);
      if (upToDateProduct && upToDateProduct !== "cancel") {
        this.productService.updateProduct(upToDateProduct).subscribe(
          (_) => {
            this.notificationService.showSuccess(
              "Product updated successfully!"
            );
            this.getAllProducts();
          },
          (error) => {
            this.notificationService.showError(`ERROR: ${error.error.message}`);
          }
        );
      }
    });
  }

  deleteProduct(product: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      data: { productId: product.id, object: `product ${product.productName}` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe((_) => {
          this.notificationService.showSuccess("Product removed successfully!");
          this.getAllProducts();
        });
      }
    });
  }
}
