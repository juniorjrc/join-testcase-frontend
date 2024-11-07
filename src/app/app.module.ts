import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { CategoryListComponent } from "./categories/category-list/category-list.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog/confirmation-dialog.component";
import { AddProductDialogComponent } from "./products/add-product-dialog/add-product-dialog.component";
import { ProductListComponent } from "./products/product-list/product-list.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    AddProductDialogComponent,
    CategoryListComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
