import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtTokenService } from "../jwt/jwt-token.service";
import { NotificationService } from "src/app/shared/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginData = { login: "", password: "" };

  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtTokenService: JwtTokenService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit() {
    this.authService.login(this.loginData).subscribe(
      (response) => {
        this.jwtTokenService.setToken(response);
        this.router.navigate(["/products"]);
      },
      (error) => {
        this.notificationService.showError(
          `Error in login: ${error.error.message}`
        );
      }
    );
  }
}
