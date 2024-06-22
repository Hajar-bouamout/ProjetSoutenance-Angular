import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UtilisateurHttpService } from '../utilisateur/utilisateur-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  inscriptionForm!: FormGroup;
  emailCtrl!: FormControl;
  passwordValueCtrl!: FormControl;
  usernameCtrl!: FormControl;
  birthdateCtrl!: FormControl;

  constructor(
    private utilisateurHttpService: UtilisateurHttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.passwordValueCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(6)]);
    this.usernameCtrl = this.formBuilder.control('', Validators.required);
    this.birthdateCtrl = this.formBuilder.control('', Validators.required);

    this.inscriptionForm = this.formBuilder.group({
      email: this.emailCtrl,
      passwordValue: this.passwordValueCtrl,
      username: this.usernameCtrl,
      birthdate: this.birthdateCtrl
    });
  }

  inscription() {
    if (this.inscriptionForm.invalid) {
      console.error("Formulaire d'inscription invalide");
      return;
    }

    this.utilisateurHttpService.register(this.inscriptionForm.value)
      .subscribe({
        next: () => {
          console.log('Inscription réussie');
          this.router.navigate(['/connexion']);
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription :", error);
          // Gestion des erreurs ici
        }
      });
  }
}

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
