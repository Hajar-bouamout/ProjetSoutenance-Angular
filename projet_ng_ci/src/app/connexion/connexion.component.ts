// connexion.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  loginForm!: FormGroup;

  emailCtrl!: FormControl;
  passwordValueCtrl!: FormControl;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.emailCtrl = this.formBuilder.control("", [Validators.required, Validators.email]);
    this.passwordValueCtrl = this.formBuilder.control("", [Validators.required, Validators.minLength(12)]);

    this.loginForm = this.formBuilder.group({
      email: this.emailCtrl,
      passwordValue: this.passwordValueCtrl
    });
  }

  connexion() {
    console.log('Formulaire soumis');
    if (this.loginForm.valid) {
      console.log('Formulaire valide, tentative de connexion...');
      this.authService.login(this.emailCtrl.value, this.passwordValueCtrl.value);
      // Redirection ou autre action après la connexion réussie
   } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs si le formulaire est invalide
      this.loginForm.markAllAsTouched();
      console.log('Formulaire invalide, veuillez vérifier les champs');
    }
  }
}
