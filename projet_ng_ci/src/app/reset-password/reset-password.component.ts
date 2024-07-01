import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from '../password-reset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent  implements OnInit {
  // token: string ='';
  // newPassword: string='';
  // error: string='';

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private passwordResetService: PasswordResetService
  // ) {}

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.token = params['token'];
  //   });
  // }

  // resetPassword(): void {
  //   this.passwordResetService.resetPassword(this.token, this.newPassword)
  //     .subscribe(
  //       () => {
  //         this.router.navigate(['/reset-password-success']);
  //       },
  //       error => {
  //         this.error = 'Erreur lors de la réinitialisation du mot de passe : ' + error.message;
  //       }
  //     );
  // } token: string = '';
  token: string = '';
  newPassword: string = '';
  error: string = '';
  passwordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService
  ) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword(): void {
    this.error = '';

    if (this.passwordForm.invalid) {
      this.error = 'Le mot de passe doit avoir au moins 8 caractères.';
      return;
    }

    this.newPassword = this.passwordForm.get('newPassword')?.value;

    // Vérifier la force du mot de passe
    this.passwordResetService.checkPasswordStrength(this.newPassword).subscribe(
      strengthResponse => {
        console.log('Strength response:', strengthResponse);
        if (!strengthResponse.strong) { // Notez ici l'accès à la propriété 'strong'
          this.error = 'Le mot de passe n\'est pas assez fort.';
          return;
        }

        // Vérifier la vulnérabilité du mot de passe
        this.passwordResetService.checkPasswordVulnerability(this.newPassword).subscribe(
          vulnerabilityResponse => {
            console.log('Vulnerability response:', vulnerabilityResponse);
            if (vulnerabilityResponse.vulnerable) { // Notez ici l'accès à la propriété 'vulnerable'
              this.error = 'Le mot de passe est vulnérable.';
              return;
            }

            // Si le mot de passe est fort et non vulnérable, réinitialiser le mot de passe
            this.passwordResetService.resetPassword(this.token, this.newPassword).subscribe(
              () => {
                this.router.navigate(['/reset-password-success']);
              },
              error => {
                this.error = 'Erreur lors de la réinitialisation du mot de passe : ' + error.message;
              }
            );
          },
          error => {
            this.error = 'Erreur lors de la vérification de la vulnérabilité du mot de passe : ' + error.message;
          }
        );
      },
      error => {
        this.error = 'Erreur lors de la vérification de la force du mot de passe : ' + error.message;
      }
    );
  }
}

