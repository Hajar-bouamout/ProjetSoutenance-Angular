import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UtilisateurHttpService } from '../utilisateur/utilisateur-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'] // Correction ici
})
export class InscriptionComponent implements OnInit {

  // Déclaration du formulaire réactif
  inscriptionForm!: FormGroup;

  // Déclaration des contrôleurs de formulaire individuels
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
    // Initialisation des contrôleurs de formulaire avec les validateurs requis
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.passwordValueCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(6)]);
    this.usernameCtrl = this.formBuilder.control('', Validators.required);
    this.birthdateCtrl = this.formBuilder.control('', Validators.required);
  
    // Création du formulaire réactif avec les contrôleurs définis
    this.inscriptionForm = this.formBuilder.group({
      email: this.emailCtrl,
      passwordValue: this.passwordValueCtrl,
      username: this.usernameCtrl,
      birthdate: this.birthdateCtrl
    });
  }
  // Fonction appelée lors de la soumission du formulaire d'inscription
  inscription() {
    if (this.inscriptionForm.invalid) {
      console.error("Formulaire d'inscription invalide");
      return;
    }

    this.utilisateurHttpService.register(this.inscriptionForm.value)
      .subscribe({
        next: () => {
          console.log('Inscription réussie');
          this.router.navigate(['/connexion']); // Redirection vers la page de connexion après inscription réussie
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription :", error);
          // Gestion des erreurs ici, affichage de messages d'erreur à l'utilisateur, etc.
          // Vous pouvez également utiliser catchError pour gérer les erreurs RxJS
          // catchError est utilisé pour intercepter l'erreur
        }
      });
  }
}
// Classe statique pour les validateurs personnalisés
export class CustomValidators {

  // ValidatorFn pour vérifier si deux champs correspondent
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      // Retourne une erreur si les champs ne correspondent pas
      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}