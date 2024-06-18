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
  passwordCtrl!: FormControl;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.emailCtrl = this.formBuilder.control("", Validators.required);
    this.passwordCtrl = this.formBuilder.control("", [Validators.required,Validators.minLength(12)]);

    this.loginForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });

   
  }

  connexion() {
    this.authService.login(this.emailCtrl.value, this.passwordCtrl.value);
  }





}

  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.emailCtrl = this.formBuilder.control("", [Validators.required, Validators.email]);
    this.passwordCtrl = this.formBuilder.control("", [Validators.required, Validators.minLength(5)]);

    this.loginForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });
  }

  connexion() {
    if (this.loginForm.valid) {
      try {
        this.authService.login(this.emailCtrl.value, this.passwordCtrl.value);
        // Redirection ou autre action après la connexion réussie
      } catch (error) {
        // Gestion de l'erreur de connexion
        console.error("Erreur de connexion :", error);
      }
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs si le formulaire est invalide
      this.loginForm.markAllAsTouched();
    }

  }}