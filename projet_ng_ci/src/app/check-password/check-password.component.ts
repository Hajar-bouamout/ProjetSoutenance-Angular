import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteService } from '../compte.service';
import { PasswordCheckRequest, PasswordCheckResponse, PasswordGeneratedResponse } from '../model';

@Component({
  selector: 'app-check-password',
  templateUrl: './check-password.component.html',
  styleUrl: './check-password.component.css'
})
export class CheckPasswordComponent {

  testPasswordForm: FormGroup;
  passwordStrengthMessage: string ="";
  passwordVulnerabilityMessage: string ="";
  suggestedPassword: string | undefined;
  passwordFieldType: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private compteService: CompteService
  ) {
    this.testPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(12)]]
    });
  }



  checkPasswordStrength(password: string): void {
    const request: PasswordCheckRequest = { password: password };
    console.log('Sending request to check password strength:', request);
    this.compteService.checkPasswordStrength(request).subscribe((response: PasswordCheckResponse) => {
      console.log('Response from checkPasswordStrength:', response); // Debugging

      if (response.strong) {
        this.passwordStrengthMessage = 'Votre mot de passe est fort.';
        this.suggestedPassword = ''; // Efface le mot de passe suggéré si le mot de passe est fort
      } else {
        this.passwordStrengthMessage = 'Votre mot de passe est faible.';
        this.suggestStrongPassword(); // Génère un mot de passe fort si le mot de passe est faible
      }
    }, error => {
      console.error('Error from checkPasswordStrength:', error);
    });
  }
  checkPasswordVulnerability(password: string): void {
    const request: PasswordCheckRequest = { password: password };
    console.log('Sending request to check password vulnerability:', request);
    this.compteService.checkPasswordVulnerability(request).subscribe((response: PasswordCheckResponse) => {
      console.log('Response from checkPasswordVulnerability:', response); // Debugging

      this.passwordVulnerabilityMessage = response.vulnerable 
        ? 'Votre mot de passe est vulnérable.' 
        : 'Votre mot de passe n est pas vulnérable.';
    }, error => {
      console.error('Error from checkPasswordVulnerability:', error);
    });
  }
  suggestStrongPassword(): void {
    console.log('Requesting a strong password suggestion...');
    this.compteService.generatePassword().subscribe((response: PasswordGeneratedResponse) => {
      this.suggestedPassword = response.password;
      console.log('Suggested Password:', this.suggestedPassword); // Debugging
    }, error => {
      console.error('Error from suggestStrongPassword:', error);
    });
  }

  onSubmit(): void {
    const password = this.testPasswordForm.get('password')?.value;
    if (password) {
      console.log('Submitted password:', password);
      this.checkPasswordStrength(password);
      this.checkPasswordVulnerability(password);
    }
  }

 
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  copyPassword(): void {
    const password = this.testPasswordForm.get('password')?.value;
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        console.log('Password copied to clipboard');
      }, error => {
        console.error('Failed to copy password: ', error);
      });
    }
  }
}

