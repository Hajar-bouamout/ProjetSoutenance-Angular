import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UtilisateurHttpService } from '../utilisateur/utilisateur-http.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  inscriptionForm!: FormGroup;

  emailCtrl!: FormControl;
  passwordValueCtrl!: FormControl;
  usernameCtrl!: FormControl;
  birthdateCtrl!: FormControl;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.passwordValueCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(12)]);
    this.usernameCtrl = this.formBuilder.control('', [Validators.required]);
    this.birthdateCtrl = this.formBuilder.control('', [Validators.required]);

    this.inscriptionForm = this.formBuilder.group({
      email: this.emailCtrl,
      passwordValue: this.passwordValueCtrl,
      username: this.usernameCtrl,
      birthdate: this.birthdateCtrl
    });
  }

  inscription() {
    console.log('Formulaire soumis');
    if (this.inscriptionForm.valid) {
      console.log('Formulaire valide, tentative d\'inscription...');
      const { email, passwordValue, username, birthdate } = this.inscriptionForm.value;
      this.authService.register(email, passwordValue, username, birthdate).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/connexion']); // Redirigez vers la page de connexion
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMessage = "L'e-mail existe déjà. Veuillez en choisir un autre.";
          } else {
            this.errorMessage = "Une erreur est survenue. Veuillez entrer une date inférieur à la date du jour.";
          }
          console.error("Erreur d'inscription :", error);
        }
      });
    } else {
      this.inscriptionForm.markAllAsTouched();
      console.log('Formulaire invalide, veuillez vérifier les champs');
    }
  }}