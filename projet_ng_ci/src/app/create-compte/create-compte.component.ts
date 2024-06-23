import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteService } from '../compte.service';
import { Router } from '@angular/router';
import { CreateCompteRequest } from '../model';

@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrl: './create-compte.component.css'
})
export class CreateCompteComponent {
  createCompteForm: FormGroup;

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
    if (this.createCompteForm.valid) {
      const createRequest: CreateCompteRequest = this.createCompteForm.value;
      this.compteService.createCompte(createRequest).subscribe(() => {
        this.router.navigate(['/compte']);
      });
    }
  }
}


