import { Injectable } from '@angular/core';
import { Utilisateur } from './model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private utilisateur?: Utilisateur = undefined;

  constructor(private http: HttpClient, private router: Router) { }

  // login(email: string, passwordValue: string) {
  //   this.http.post<Utilisateur>(environment.apiUrl + "/utilisateur/connexion", {email, passwordValue }).subscribe(resp => {
  //     this.utilisateur = resp;

  //     console.log('Utilisateur connecté :', this.utilisateur); // Ajout du log pour vérifier l'utilisateur connecté

  //     this.router.navigate(["/compte"]);
  //   });
  // }

  // logout() {
  //   this.utilisateur = undefined;
  // }


  login(email: string, passwordValue: string) {
    this.http.post<Utilisateur>(`${environment.apiUrl}/utilisateur/connexion`, { email, passwordValue }).subscribe(
      resp => {
        this.utilisateur = resp;

        console.log('Utilisateur connecté :', this.utilisateur); // Ajout du log pour vérifier l'utilisateur connecté

        // Stocker l'utilisateur connecté dans le stockage local/session
        localStorage.setItem('utilisateur', JSON.stringify(this.utilisateur));

        this.router.navigate(["/compte"]);
      },
      error => {
        console.error('Erreur de connexion :', error);
        // Vous pouvez ajouter des notifications ou des messages d'erreur ici pour informer l'utilisateur
      }
    );
  }

  getCurrentUser(): Utilisateur | undefined {
    if (!this.utilisateur) {
      const storedUser = localStorage.getItem('utilisateur');
      this.utilisateur = storedUser ? JSON.parse(storedUser) : undefined;
    }
    return this.utilisateur;
  }

  // logout() {
  //   this.utilisateur = undefined;
  //   localStorage.removeItem('utilisateur');
  //   this.router.navigate(['/login']);
  // }

  isLogged(): boolean {
    return this.utilisateur != undefined;
  }

  getUtilisateur() : Utilisateur | undefined{
    if(this.utilisateur) {
      return this.utilisateur;
    }

    return undefined;
  }
}