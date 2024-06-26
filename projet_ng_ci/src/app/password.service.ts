import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private baseUrl = 'http://localhost:8080/api/password';

  constructor(private http: HttpClient) { }

  // Méthode pour créer un mot de passe
  createPassword(request: CreatePasswordRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/ajout`, request);
  }

  // Méthode pour mettre à jour le mot de passe d'un utilisateur
  updatePassword(idUser: string, newPassword: string): Observable<void> {
    const params = { idUser, newPassword };
    return this.http.put<void>(`${this.baseUrl}/utilisateur/update`, params);
  }

  // Méthode pour obtenir le mot de passe d'un utilisateur par son IDs
  getPasswordByUserId(idUser: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/utilisateur/${idUser}`);
  }

  

 
  checkPasswordStrength(password: string): Observable<PasswordCheckResponse> {
    return this.http.post<PasswordCheckResponse>('/api/password/compte/check-strength', { password });
  }

  // Méthode pour vérifier la vulnérabilité du mot de passe
  checkPasswordVulnerability(request: PasswordCheckRequest): Observable<PasswordCheckResponse> {
    return this.http.post<PasswordCheckResponse>(`${this.baseUrl}/compte/check-vulnerability`, request);
  }

  // Méthode pour générer un mot de passe fort
  // generatePassword(): Observable<PasswordGeneratedResponse> {
  //   return this.http.post<PasswordGeneratedResponse>(`${this.baseUrl}/compte/generate`, null);
  // }
  generatePassword(): Observable<{ password: string }> {
    return this.http.post<{ password: string }>('/api/password/compte/generate', {});
  }






}


// Interfaces pour les requêtes et réponses

export interface CreatePasswordRequest {
  // Définir ici les propriétés nécessaires pour créer un mot de passe
}

export interface PasswordCheckRequest {
  password: string;
}

export interface PasswordCheckResponse {
  isStrong: boolean;
  isVulnerable: boolean;
  message: string;
}

export interface PasswordGeneratedResponse {
  password: string;
}