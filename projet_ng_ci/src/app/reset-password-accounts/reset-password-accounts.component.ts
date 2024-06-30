import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Assurez-vous que ce chemin est correct
import { PasswordResetService } from '../password-reset.service';

@Component({
  selector: 'app-reset-password-accounts',
  templateUrl: './reset-password-accounts.component.html',
  styleUrls: ['./reset-password-accounts.component.css']
})
export class ResetPasswordAccountsComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  successMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private passwordResetService: PasswordResetService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(12)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      this.passwordResetService.resetPassword(this.token, newPassword).subscribe({
        next: () => {
          this.successMessage = 'Mot de passe réinitialisé avec succès.';
          this.errorMessage = undefined;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur lors de la réinitialisation du mot de passe', err);
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      });
    }
  }
}

