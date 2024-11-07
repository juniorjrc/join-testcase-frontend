import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { ProductListComponent } from "./products/product-list/product-list.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "products", component: ProductListComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
