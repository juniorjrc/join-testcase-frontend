import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddProductDialogComponent } from "./add-product-dialog/add-product-dialog.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductListComponent } from "./product-list/product-list.component";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    AddProductDialogComponent,
  ],
  imports: [CommonModule],
})
export class ProductsModule {}
