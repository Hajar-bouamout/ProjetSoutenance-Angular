import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from '../compte.service';
import { CreateCompteRequest } from '../model';

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
    private router: Router
  ) {
    this.createCompteForm = this.formBuilder.group({
      platformName: ['', Validators.required],
      platformDescription: [''],
      creationDate: [new Date()],
      username: ['', Validators.required],
      urlAdress: [''],
      password: ['', [Validators.required, Validators.minLength(12)]]
    });
  }

  onSubmit(): void {
    console.log('onSubmit called');
    if (this.createCompteForm.valid) {
      console.log('Form is valid');
      const createRequest: CreateCompteRequest = this.createCompteForm.value;
      this.compteService.createCompte(createRequest).subscribe({
        next: () => {
          console.log('Compte créé avec succès');
          this.router.navigate(['/compte/ajout']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du compte', err);
          if (err.status === 400) {
            // Cas où le mot de passe n'est pas assez fort
            this.errorMessage = err.error;
            if (err.error.includes('Mot de passe suggéré')) {
              const suggestedPassword = err.error.split(': ')[1].trim();
              this.suggestedPassword = suggestedPassword;
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