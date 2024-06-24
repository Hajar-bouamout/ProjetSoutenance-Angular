
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../password.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.css'
})
export class RequestResetPasswordComponent implements OnInit {
  requestResetForm: FormGroup;
  message: string | null = null;

  constructor(private formBuilder: FormBuilder, private passwordService: PasswordService) {
    this.requestResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  // Méthode pour accéder à la propriété email sous forme de getter
  get email() {
    return this.requestResetForm.get('email');
  }

  onSubmit() {
    if (this.requestResetForm.valid) {
      const email = this.requestResetForm.value.email;
      this.passwordService.requestPasswordReset(email).subscribe(
        response => {
          this.message = 'Un email de réinitialisation de mot de passe a été envoyé.';
        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            console.error('Une erreur côté client s\'est produite :', error.error.message);
          } else {
            // Erreur côté serveur
            console.error('Erreur lors de la demande de réinitialisation de mot de passe :', error.status, error.statusText);
          }
          this.message = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';
        }
      );
    } else {
      // Marquer tous les champs du formulaire comme touchés pour afficher les erreurs
      this.requestResetForm.markAllAsTouched();
    }
  }
}