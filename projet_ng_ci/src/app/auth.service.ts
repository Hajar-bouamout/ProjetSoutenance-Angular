import { Injectable } from '@angular/core';
import { Utilisateur } from './model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private utilisateur?: Utilisateur = undefined;
  private idUser?: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, passwordValue: string): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${environment.apiUrl}/utilisateur/connexion`, { email, passwordValue }).pipe(
      map(user => {
        this.utilisateur = user;
        this.idUser = user.id;  // Assurez-vous que l'objet Utilisateur contient un champ 'id'
        localStorage.setItem('utilisateur', JSON.stringify(user));
        if (this.idUser) {
          localStorage.setItem('idUser', this.idUser);
        }
        return user;
      })
    );
  }

  getCurrentUser(): Utilisateur | undefined {
    if (!this.utilisateur) {
      const storedUser = localStorage.getItem('utilisateur');
      this.utilisateur = storedUser ? JSON.parse(storedUser) : undefined; 
    }
    return this.utilisateur;
  }

  register(email: string, passwordValue: string, username: string, birthdate: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/utilisateur/inscription`, { email, passwordValue, username, birthdate });
  }

  getIdUtilisateur(): string | undefined {
    if (!this.idUser) {
      this.idUser = localStorage.getItem('idUser') || undefined;
    }
    return this.idUser;
  }

  setIdUtilisateur(id: string): void {
    this.idUser = id;
    localStorage.setItem('idUser', id);
  }

  // isLogged(): boolean {
  //   return !!this.getCurrentUser();
  // }


  getUtilisateur(): Utilisateur | undefined {
    return this.getCurrentUser();
  }

  logout(): void {
    // Effacez toute information de session ou d'état de connexion
    localStorage.removeItem('idUser'); // Supprimer l'ID utilisateur ou toute autre information pertinente
    // Autres opérations de déconnexion si nécessaires

    // Rediriger vers la page de connexion
    this.router.navigate(['/connexion']);
  }

  isLogged(): boolean {
    // Logique pour vérifier si l'utilisateur est connecté
    const idUser = localStorage.getItem('idUser'); // Vérifier l'ID utilisateur ou autre information de session
    return !!idUser; // Retourne vrai si l'ID utilisateur est défini, faux sinon
  }

}