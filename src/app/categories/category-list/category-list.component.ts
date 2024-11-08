import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { JwtTokenService } from "src/app/auth/jwt/jwt-token.service";
import { CategoryService } from "../category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categories = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    "category",
    "description",
    "minPrice",
    "maxPrice",
  ];
  totalElements = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private jwtTokenService: JwtTokenService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.jwtTokenService.checkToken();
    this.getAllCategories();
  }

  getAllCategories(page: number = 0, size: number = 10) {
    this.categoryService.getAllCategories(page, size).subscribe((response) => {
      console.log(response);
      this.categories.data = response.content;
      this.totalElements = response.totalElements;
    });
  }

  onPageChange(event: any) {
    this.getAllCategories(event.pageIndex, event.pageSize);
  }
}
