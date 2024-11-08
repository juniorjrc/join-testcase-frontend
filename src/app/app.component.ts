import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  @ViewChild("sidenav") sidenav!: MatSidenav;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }
}
