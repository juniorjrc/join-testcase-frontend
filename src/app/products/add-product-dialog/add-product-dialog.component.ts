import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Category } from "src/app/models/category";

@Component({
  selector: "app-add-product-dialog",
  templateUrl: "./add-product-dialog.component.html",
  styleUrls: ["./add-product-dialog.component.scss"],
})
export class AddProductDialogComponent implements OnInit {
  product: any = {
    productName: "",
    productDescription: "",
    categoryId: null,
    price: 0,
    technicalSpecifications: "",
    imeiNumber: "",
    operatingSystem: "",
  };
  categories: Category[] = [];
  category: Category = { id: 0, categoryName: "" };
  selectedCategory: Category = { id: 0, categoryName: "" };
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.categories) {
      this.categories = data.categories;
    }
    if (data.product !== null) {
      this.product = { ...data.product };
      this.isEditMode = true;
      this.category = data.product.category;
    }
  }

  ngOnInit(): void {
    if (this.isEditMode && this.product.category) {
      this.selectedCategory =
        this.categories.find((cat) => cat.id === this.product.category.id) ||
        this.category;
    }
  }

  onCancel(): void {
    this.dialogRef.close("cancel");
  }

  onSave(): void {
    this.product.categoryId = this.selectedCategory.id;
    this.dialogRef.close(this.product);
  }
}
