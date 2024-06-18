import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UtilisateurHttpService } from '../utilisateur/utilisateur-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {


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
    this.emailCtrl = this.formBuilder.control("", Validators.required);
    this.passwordValueCtrl = this.formBuilder.control("", Validators.required);
    this.usernameCtrl = this.formBuilder.control("", Validators.required);
    this.birthdateCtrl = this.formBuilder.control("", Validators.required);

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
    this.utilisateurHttpService.register(this.inscriptionForm.value).subscribe(
      () => {
        // Redirection vers la page de connexion après l'inscription réussie
        this.router.navigate(['/login']);
      },
      (error) => {
        // Gestion des erreurs en cas d'échec de l'inscription
        console.error("Erreur lors de l'inscription :", error);
        // Afficher un message d'erreur à l'utilisateur ou prendre une autre action appropriée
      }
    );
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