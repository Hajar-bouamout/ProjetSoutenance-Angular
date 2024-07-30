import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordCheckRequest, PasswordCheckResponse, PasswordGeneratedResponse } from '../model';
import { CompteService } from '../compte.service';

@Component({
  selector: 'inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  inscriptionForm!: FormGroup;
  passwordVulnerabilityMessage: string | undefined;
  passwordStrengthMessage: string = ''; // Ajoutez cette propriété
  isPasswordConfirmed: boolean = false;
  errorMessage: string = '';
  suggestedPassword: string | undefined;
  passwordVisible: boolean = false;
  isPasswordWeak: boolean = false; // État pour vérifier si le mot de passe est faible
  isCheckingPassword: boolean = false; // État pour vérifier si nous sommes en train de vérifier le mot de passe

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private compteService: CompteService // Assurez-vous d'avoir ce service injecté
  ) { }

  ngOnInit(): void {
    this.inscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordValue: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required]],
      username: ['', [Validators.required]],
      birthdate: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.inscriptionForm.get('passwordValue')?.valueChanges.subscribe(password => {
      this.checkPasswordStrength(password);
      this.checkPasswordVulnerability(password);
    });
  }

  passwordMatchValidator(formGroup: FormGroup): Validators | null {
    const password = formGroup.get('passwordValue')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  checkPasswordStrength(password: string): void {
    this.isCheckingPassword = true; // Définir l'état de vérification
    const request: PasswordCheckRequest = { password };
    this.compteService.checkPasswordStrength(request).subscribe({
      next: (response: PasswordCheckResponse) => {
        this.isCheckingPassword = false; // Réinitialiser l'état de vérification
        if (response.strong) {
          this.passwordStrengthMessage = 'Votre mot de passe est fort.';
          this.isPasswordWeak = false;
          this.suggestedPassword = undefined; // Effacer le mot de passe suggéré si le mot de passe est fort
        } else {
          this.passwordStrengthMessage = 'Votre mot de passe est faible.';
          this.isPasswordWeak = true;
          if (!this.suggestedPassword) { // Éviter de générer plusieurs fois le mot de passe suggéré
            this.suggestStrongPassword();
          }
        }
      },
      error: (error) => {
        this.isCheckingPassword = false; // Réinitialiser l'état de vérification
        console.error('Erreur lors de la vérification de la force du mot de passe:', error);
      }
    });
  }

  checkPasswordVulnerability(password: string): void {
    const request: PasswordCheckRequest = { password };
    this.compteService.checkPasswordVulnerability(request).subscribe({
      next: (response: PasswordCheckResponse) => {
        if (response.vulnerable) {
          this.passwordVulnerabilityMessage = 'Votre mot de passe est vulnérable. Veuillez choisir un mot de passe plus sécurisé.';
          this.isPasswordConfirmed = false;
        } else {
          this.passwordVulnerabilityMessage = 'Votre mot de passe n\'est pas vulnérable.';
          this.isPasswordConfirmed = true;
        }
      },
      error: (error) => {
        console.error('Erreur lors de la vérification de la vulnérabilité du mot de passe:', error);
        this.passwordVulnerabilityMessage = 'Erreur lors de la vérification de la vulnérabilité du mot de passe.';
        this.isPasswordConfirmed = false;
      }
    });
  }

  suggestStrongPassword(): void {
    this.compteService.generatePassword().subscribe({
      next: (response: PasswordGeneratedResponse) => {
        this.suggestedPassword = response.password;
      },
      error: (error) => {
        console.error('Erreur lors de la génération d\'un mot de passe fort:', error);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  inscription(): void {
    if (this.inscriptionForm.valid && this.isPasswordConfirmed) {
      const { email, passwordValue, username, birthdate } = this.inscriptionForm.value;
      this.authService.register(email, passwordValue, username, birthdate).subscribe({
        next: (response) => {
          this.router.navigate(['/connexion']);  // Rediriger vers la page de connexion
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMessage = "L'e-mail existe déjà. Veuillez en choisir un autre.";
          } else if (error.status === 400 && error.error) {
            const suggestedPasswordMatch = error.error.match(/Mot de passe suggéré : (\S+)/);
            if (suggestedPasswordMatch) {
              this.suggestedPassword = suggestedPasswordMatch[1];
              this.errorMessage = error.error;
            } else {
              this.errorMessage = "Le mot de passe n'est pas suffisamment fort.";
            }
          } else {
            this.errorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
          }
          console.error("Erreur d'inscription :", error);
        }
      });
    } else {
      this.inscriptionForm.markAllAsTouched();
    }
  }

  copySuggestedPassword(): void {
    if (this.suggestedPassword) {
      navigator.clipboard.writeText(this.suggestedPassword).then(() => {
        console.log('Mot de passe copié dans le presse-papiers.');
      }).catch(err => {
        console.error('Erreur lors de la copie du mot de passe :', err);
      });
    }
  }
}
