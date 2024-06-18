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

  login(email: string, passwordValue: string) {
    this.http.post<Utilisateur>(environment.apiUrl + "/utilisateur/connexion", { email, "passwordValue": passwordValue }).subscribe(resp => {
      this.utilisateur = resp;

      this.router.navigate(["/home"]);
    });
  }

  // logout() {
  //   this.utilisateur = undefined;
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