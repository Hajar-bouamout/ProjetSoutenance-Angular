import { Injectable } from '@angular/core';
import { Utilisateur } from '../model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurHttpService {

  private apiUrl = `${environment.apiUrl}/utilisateur`; // URL de ton API

  constructor(private http: HttpClient) {}

  // Inscription
  register(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiUrl}/inscription`, user);
  }

  // Connexion
  login(credentials: { email: string, passwordValue: string }): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/connexion`, credentials);
  }

  // Récupération de tous les utilisateurs
  getAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }

  // Récupération d'un utilisateur par ID
  getUserById(id: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  // Réinitialisation de mot de passe - Demande
  requestPasswordReset(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/request-reset`, { email });
  }

  // Réinitialisation de mot de passe - Réinitialisation
  resetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/reset`, { token, newPassword });
  }

  // Mise à jour de mot de passe
  updatePassword(idUser: string, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update`, { idUser, newPassword });
  }
}