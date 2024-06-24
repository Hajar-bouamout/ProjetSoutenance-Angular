
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.css'
})
export class RequestResetPasswordComponent implements OnInit {
  requestResetForm: FormGroup;
  message: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
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
      this.authService.requestPasswordReset(email).subscribe(
        response => {
          this.message = 'Un email de réinitialisation de mot de passe a été envoyé.';
        },
        error => {
          this.message = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';
        }
      );
    }
  }
}