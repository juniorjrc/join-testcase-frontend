import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showError(message: string, action: string = "Close") {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["error-snackbar"],
    });
  }

  showSuccess(message: string, action: string = "Close") {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["success-snackbar"],
    });
  }
}
