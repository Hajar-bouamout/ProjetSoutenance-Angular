import { Component } from '@angular/core';
import { PasswordService } from '../password.service';
import { PasswordResetService } from '../password-reset.service';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.css'
})
export class RequestResetPasswordComponent {
  email: string = '';

  constructor(private passwordResetService: PasswordResetService) { }

  onSubmit() {
    if (!this.email) {
      alert('Please enter a valid email address.');
      return;
    }

    this.passwordResetService.requestPasswordReset(this.email).subscribe(
      response => {
        alert(response);
      },
      error => {
        alert('An error occurred.');
        console.error(error);
      }
    );
  }


 






}
