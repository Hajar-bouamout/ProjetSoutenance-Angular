import { Injectable } from '@angular/core';
import { Utilisateur } from './model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './environments/environment';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private utilisateur?: Utilisateur = undefined;

  private idUser?: string;

  constructor(private http: HttpClient, private router: Router) { }

 
  login(email: string, passwordValue: string): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${environment.apiUrl}/utilisateur/connexion`, { email, passwordValue });
  }

  getCurrentUser(): Utilisateur | undefined {
    if (!this.utilisateur) {
      const storedUser = localStorage.getItem('utilisateur');
      this.utilisateur = storedUser ? JSON.parse(storedUser) : undefined; 

       
    }
    return this.utilisateur;
  }
// Méthode d'inscription
register(email: string, passwordValue: string, username: string, birthdate: string): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/utilisateur/inscription`, { email, passwordValue, username, birthdate });
}
  // logout() {
  //   this.utilisateur = undefined;
  //   localStorage.removeItem('utilisateur');
  //   this.router.navigate(['/login']);
  // }

   // Méthode pour récupérer l'ID de l'utilisateur connecté
   getIdUtilisateur(): string | undefined {
    return this.idUser;
  }

  // Méthode pour définir l'ID de l'utilisateur connecté
  setIdUtilisateur(id: string): void {
    this.idUser = id;
  }
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