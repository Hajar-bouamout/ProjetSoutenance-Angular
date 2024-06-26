import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../password.service';
import { PasswordResetService } from '../password-reset.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent  implements OnInit {
  token: string ='';
  newPassword: string='';
  error: string='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passwordResetService: PasswordResetService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword(): void {
    this.passwordResetService.resetPassword(this.token, this.newPassword)
      .subscribe(
        () => {
          this.router.navigate(['/reset-password-success']);
        },
        error => {
          this.error = 'Erreur lors de la réinitialisation du mot de passe : ' + error.message;
        }
      );
  }
}

