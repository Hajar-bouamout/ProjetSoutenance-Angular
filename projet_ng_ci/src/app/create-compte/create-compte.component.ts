import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from '../compte.service';
import { CreateCompteRequest } from '../model';
import { AuthService } from '../auth.service';  // Assurez-vous d'avoir un service d'authentification pour obtenir l'utilisateur courant

@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.css']
})
export class CreateCompteComponent {
  createCompteForm: FormGroup;
  errorMessage: string | undefined;
  suggestedPassword: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private compteService: CompteService,
    private router: Router,
    private authService: AuthService  // Injection du service d'authentification
  ) {
    this.createCompteForm = this.formBuilder.group({
      platformName: ['', Validators.required],
      platformDescription: [''],
      creationDate: [new Date().toISOString().split('T')[0], Validators.required],
      username: ['', Validators.required],
      urlAdress: [''],
      password: ['', [Validators.required, Validators.minLength(12)]],
      userId: ['']  // Ajout de ce champ
    });

    // Obtenir l'utilisateur courant et mettre à jour le champ userId
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.createCompteForm.patchValue({ userId: currentUser.id });
    }
  }

  onSubmit(): void {
    if (this.createCompteForm.valid) {
      const createRequest: CreateCompteRequest = this.createCompteForm.value;
      this.compteService.createCompte(createRequest).subscribe({
        next: (response: string) => {
          console.log('Compte créé avec succès, réponse:', response);
          this.router.navigate(['/comptes']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du compte', err);
          if (err.status === 400) {
            this.errorMessage = err.error;
            if (typeof err.error === 'string' && err.error.startsWith('{') && err.error.endsWith('}')) {
              const errorObject = JSON.parse(err.error);
              if (errorObject.message && errorObject.message.includes('Mot de passe suggéré')) {
                this.suggestedPassword = errorObject.message.split(': ')[1];
              }
            } else {
              this.errorMessage = err.error;
            }
          } else {
            this.errorMessage = 'Une erreur est survenue lors de la création du compte.';
          }
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
