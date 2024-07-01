import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UtilisateurHttpService } from '../utilisateur/utilisateur-http.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordCheckRequest, PasswordCheckResponse } from '../model';
import { switchMap } from 'rxjs/operators';
import { CompteService } from '../compte.service';

@Component({
  selector: 'inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit{
  
  
  inscriptionForm!: FormGroup;
  passwordVulnerabilityMessage: string | undefined;
  isPasswordConfirmed: boolean = false;
  errorMessage: string = '';
  suggestedPassword: string | undefined;
  passwordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordValue: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required]],
      username: ['', [Validators.required]],
      birthdate: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.inscriptionForm.get('passwordValue')?.valueChanges.subscribe(() => {
      this.checkPasswordVulnerability();
    });
  }

  passwordMatchValidator(formGroup: FormGroup): Validators | null {
    const password = formGroup.get('passwordValue')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  checkPasswordVulnerability(): void {
    const password = this.inscriptionForm.get('passwordValue')?.value;
    if (password) {
      this.authService.checkPasswordVulnerability(password).subscribe({
        next: (response: PasswordCheckResponse) => {
          console.log('Réponse de la vérification de la vulnérabilité du mot de passe:', response);
          if (response.isVulnerable) {
            this.passwordVulnerabilityMessage = 'Votre mot de passe est vulnérable. Veuillez choisir un mot de passe plus sécurisé.';
            this.isPasswordConfirmed = false;

            // Extraire le mot de passe suggéré du message
            const suggestedPasswordMatch = response.message?.match(/Mot de passe suggéré : (\S+)/);
            this.suggestedPassword = suggestedPasswordMatch ? suggestedPasswordMatch[1] : undefined;
            console.log('Mot de passe suggéré:', this.suggestedPassword);

          } else {
            this.passwordVulnerabilityMessage = 'Votre mot de passe n\'est pas vulnérable.';
            this.isPasswordConfirmed = true;
            this.suggestedPassword = undefined;
          }
        },
        error: (err: any) => {
          console.error('Erreur lors de la vérification de la vulnérabilité du mot de passe', err);
          this.passwordVulnerabilityMessage = 'Erreur lors de la vérification de la vulnérabilité du mot de passe.';
          this.isPasswordConfirmed = false;
          this.suggestedPassword = undefined;
        }
      });
    }
  }


  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  inscription(): void {
    console.log('Formulaire soumis');
    if (this.inscriptionForm.valid && this.isPasswordConfirmed) {
      console.log('Formulaire valide, tentative d\'inscription...');
      const { email, passwordValue, username, birthdate } = this.inscriptionForm.value;
      this.authService.register(email, passwordValue, username, birthdate).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/connexion']);  // Rediriger vers la page de connexion
        },
        error: (error) => {
          console.log('Erreur d\'inscription :', error);

          if (error.status === 409) {
            this.errorMessage = "L'e-mail existe déjà. Veuillez en choisir un autre.";
          } else if (error.status === 400 && error.error) {
            const suggestedPasswordMatch = error.error.match(/Mot de passe suggéré : (\S+)/);
            if (suggestedPasswordMatch) {
              this.suggestedPassword = suggestedPasswordMatch[1];
              this.errorMessage = error.error; // Afficher l'ensemble du message d'erreur
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
      console.log('Formulaire invalide, veuillez vérifier les champs');
    }
  }

  copySuggestedPassword(): void {
    const el = document.createElement('textarea');
    el.value = this.suggestedPassword || '';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}