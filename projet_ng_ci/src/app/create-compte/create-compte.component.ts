import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteService } from '../compte.service';
import { Router } from '@angular/router';
import { CreateCompteRequest } from '../model';


@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.css']
})
export class CreateCompteComponent {
  createCompteForm: FormGroup;
  errorMessage: string | undefined;

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
          this.router.navigate(['/compte']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du compte', err);
          this.errorMessage = 'Erreur lors de la création du compte : ' + (err.error?.message || 'Une erreur interne est survenue.');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}