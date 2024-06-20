import { Injectable } from '@angular/core';
import { Utilisateur } from '../model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurHttpService {

  private apiUrl = `${environment.apiUrl}/utilisateur`; // URL de l'API

  constructor(private http: HttpClient) {}

  // Inscription
  register(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiUrl}/inscription`, user)
      .pipe(catchError(this.handleError));
  }

  // Connexion
  login(credentials: { email: string, passwordValue: string }): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/connexion`, credentials)
      .pipe(catchError(this.handleError));
  }

  // Récupération de tous les utilisateurs
  getAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Récupération d'un utilisateur par ID
  getUserById(id: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Réinitialisation de mot de passe - Demande
  requestPasswordReset(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/request-reset`, { email })
      .pipe(catchError(this.handleError));
  }

  // Réinitialisation de mot de passe - Réinitialisation
  resetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/reset`, { token, newPassword })
      .pipe(catchError(this.handleError));
  }

  // Mise à jour de mot de passe
  updatePassword(idUser: string, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update`, { idUser, newPassword })
      .pipe(catchError(this.handleError));
  }

  // Gestion des erreurs
  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    return throwError(error);
  }
}