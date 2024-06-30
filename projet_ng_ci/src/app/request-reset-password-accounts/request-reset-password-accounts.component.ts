import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PasswordResetService } from '../password-reset.service';

@Component({
  selector: 'app-request-reset-password-accounts',
  templateUrl: './request-reset-password-accounts.component.html',
  styleUrl: './request-reset-password-accounts.component.css'
})
export class RequestResetPasswordAccountsComponent {
  requestResetForm: FormGroup;
  successMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private passwordResetService : PasswordResetService
  ) {
    this.requestResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    
  }

  onSubmit(): void {
    if (this.requestResetForm.valid) {
      const email = this.requestResetForm.get('email')?.value;
      this.passwordResetService.requestPasswordReset(email).subscribe({
        next: () => {
          this.successMessage = 'Un email de réinitialisation a été envoyé.';
          this.errorMessage = undefined;
        },
        error: (err) => {
          console.error('Erreur lors de la demande de réinitialisation du mot de passe', err);
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      });
    }
  }

}
