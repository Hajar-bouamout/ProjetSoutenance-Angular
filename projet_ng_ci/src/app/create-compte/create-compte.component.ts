import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from '../compte.service';
import { CreateCompteRequest, PasswordCheckRequest, PasswordCheckResponse, PasswordGeneratedResponse } from '../model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.css']
})
export class CreateCompteComponent {
  createCompteForm: FormGroup;
  errorMessage: string | undefined;
  passwordStrengthMessage: string = "";
  passwordVulnerabilityMessage: string = "";
  suggestedPassword: string | undefined;
  isPasswordConfirmed: boolean = false;
  passwordFieldType: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private compteService: CompteService,
    private router: Router,
    private authService: AuthService
  ) {
    this.createCompteForm = this.formBuilder.group({
      platformName: ['', Validators.required],
      platformDescription: [''],
      creationDate: [new Date().toISOString().split('T')[0], Validators.required],
      username: ['', Validators.required],
      urlAdress: [''],
      password: ['', [Validators.required, Validators.minLength(12)]],
      userId: ['']
    });

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.createCompteForm.patchValue({ userId: currentUser.id });
    }
  }

  checkPasswordStrength(password: string): void {
    const request: PasswordCheckRequest = { password: password };
    this.compteService.checkPasswordStrength(request).subscribe((response: PasswordCheckResponse) => {
      if (response.strong) {
        this.passwordStrengthMessage = 'Votre mot de passe est fort.';
        this.suggestedPassword = ''; // Efface le mot de passe suggéré si le mot de passe est fort
        this.isPasswordConfirmed = true;
      } else {
        this.passwordStrengthMessage = 'Votre mot de passe est faible.';
        this.suggestStrongPassword(); // Génère un mot de passe fort si le mot de passe est faible
        this.isPasswordConfirmed = false;
      }
    }, error => {
      console.error('Erreur lors de la vérification de la force du mot de passe:', error);
    });
  }

  checkPasswordVulnerability(password: string): void {
    const request: PasswordCheckRequest = { password: password };
    this.compteService.checkPasswordVulnerability(request).subscribe((response: PasswordCheckResponse) => {
      this.passwordVulnerabilityMessage = response.vulnerable 
        ? 'Votre mot de passe est vulnérable.' 
        : 'Votre mot de passe n\'est pas vulnérable.';
    }, error => {
      console.error('Erreur lors de la vérification de la vulnérabilité du mot de passe:', error);
    });
  }

  suggestStrongPassword(): void {
    this.compteService.generatePassword().subscribe((response: PasswordGeneratedResponse) => {
      this.suggestedPassword = response.password;
    }, error => {
      console.error('Erreur lors de la génération d\'un mot de passe fort:', error);
    });
  }

  onSubmit(): void {
    const password = this.createCompteForm.get('password')?.value;
    if (password) {
      this.checkPasswordStrength(password);
      this.checkPasswordVulnerability(password);
      if (this.isPasswordConfirmed) {
        this.confirmPassword();
      }
    }
  }

  confirmPassword(): void {
    if (this.isPasswordConfirmed) {
      const createRequest: CreateCompteRequest = this.createCompteForm.value;
      this.compteService.createCompte(createRequest).subscribe({
        next: (response: any) => {
          console.log('Compte créé avec succès, réponse:', response);
          this.router.navigate(['/comptes']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du compte', err);
          if (err.status === 400) {
            const errorResponse = err.error;
            this.errorMessage = errorResponse.error;
            this.suggestedPassword = errorResponse.suggestedPassword;
          } else {
            this.errorMessage = 'Une erreur est survenue lors de la création du compte.';
          }
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  copyPassword(): void {
    const password = this.createCompteForm.get('password')?.value;
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        console.log('Mot de passe copié dans le presse-papiers');
      }, error => {
        console.error('Impossible de copier le mot de passe : ', error);
      });
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('Mot de passe copié dans le presse-papiers');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }
}