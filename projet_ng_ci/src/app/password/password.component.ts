import { Component } from '@angular/core';
import { PasswordService, PasswordCheckRequest, PasswordCheckResponse } from '../password.service';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

  constructor(private passwordService: PasswordService) {}

  checkPasswordStrength(password: string) {
    const request: PasswordCheckRequest = { password }; // Utilisation correcte de PasswordCheckRequest
    this.passwordService.checkPasswordStrength(password)
      .subscribe((response: PasswordCheckResponse) => {
        console.log(response.message); // Gérer la réponse ici
      }, (error: any) => {
        console.error('Erreur lors de la vérification de la force du mot de passe :', error);
      });
  }

}