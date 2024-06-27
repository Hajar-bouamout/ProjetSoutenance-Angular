// connexion.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  loginForm!: FormGroup;

  emailCtrl!: FormControl;
  passwordValueCtrl!: FormControl;
  passwordVisible: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.passwordValueCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(12)]);

    this.loginForm = this.formBuilder.group({
      email: this.emailCtrl,
      passwordValue: this.passwordValueCtrl
    });
  }
  

  connexion() {
    console.log('Formulaire soumis');
    if (this.loginForm.valid) {
      console.log('Formulaire valide, tentative de connexion...');
      this.authService.login(this.emailCtrl.value, this.passwordValueCtrl.value).subscribe({
        next: (response: any) => {
          console.log('Connexion réussie', response);
          this.router.navigate(['/compte']); // Redirigez vers la page d'accueil ou une autre page
        },
        error: (error: { status: number; }) => {
          if (error.status === 404) {
            this.errorMessage = "L'email n'existe pas.";
          } else if (error.status === 401) {
            this.errorMessage = "Le mot de passe est incorrect.";
          } else {
            this.errorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
          }
          console.error("Erreur de connexion :", error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Formulaire invalide, veuillez vérifier les champs');
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}


