import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from '../compte.service';
import { CompteResponse, CreateCompteRequest } from '../model';

@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.css']
})
export class CreateCompteComponent {
  createCompteForm: FormGroup;
  errorMessage: string | undefined;
  suggestedPassword: string | undefined;
  compteId: string;

  constructor(
    private formBuilder: FormBuilder,
    private compteService: CompteService,
    private router: Router
  ) {
    this.createCompteForm = this.formBuilder.group({
      platformName: ['', Validators.required],
      platformDescription: [''],
      creationDate: [new Date().toISOString().split('T')[0], Validators.required],
      username: ['', Validators.required],
      urlAdress: [''],
      password: ['', [Validators.required, Validators.minLength(12)]]
    });
    this.compteId = '';
  }

  onSubmit(): void {
    if (this.createCompteForm.valid) {
      const createRequest: CreateCompteRequest = this.createCompteForm.value;
      this.compteService.createCompte(createRequest).subscribe({
        next: (compteResponse: CompteResponse) => {
          console.log('Compte créé avec succès', compteResponse);
          this.router.navigate(['/comptes']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du compte', err);
          if (err.status === 400) {
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