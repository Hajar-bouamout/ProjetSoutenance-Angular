import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Compte, CompteResponse, CreateCompteRequest, PasswordCheckRequest, PasswordCheckResponse, PasswordGeneratedResponse } from './model';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

 
 

//   constructor(private http: HttpClient) { }

//   // Méthode pour récupérer les comptes de l'utilisateur par son ID
//   getComptesUtilisateur(idUser: string): Observable<Compte[]> {
//     return this.http.get<Compte[]>(`${environment.apiUrl}/compte/${idUser}`);
//   }
// }

  private baseUrl = `${environment.apiUrl}/compte`;

  constructor(private http: HttpClient) { }

  getAllComptes(): Observable<CompteResponse[]> {
    return this.http.get<CompteResponse[]>(this.baseUrl).pipe(
      tap((comptes) => console.log('Réponse de getAllComptes :', comptes))
    );
  }

  getComptesByUserId(idUser: string): Observable<CompteResponse[]> {
    const url = `${this.baseUrl}/utilisateur/${idUser}`;
    return this.http.get<CompteResponse[]>(url).pipe(
      tap((comptes) => console.log(`Réponse de getComptesByUserId pour userId ${idUser} :`, comptes))
    );
  }

  getCompteById(id: string): Observable<CompteResponse> {
    return this.http.get<CompteResponse>(`${this.baseUrl}/${id}`);
  }

 
  createCompte(request: CreateCompteRequest): Observable<CompteResponse> {
    const url = `${this.baseUrl}/ajout`;
    return this.http.post<CompteResponse>(url, request);
  }
  
  decryptPassword(compteId: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/decryptPassword`, { compteId });
  }

  
  updateCompte(id: string, compte: CompteResponse): Observable<CompteResponse> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.put<CompteResponse>(url, compte);
  }

  deleteCompte(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  checkPasswordStrength(request: PasswordCheckRequest): Observable<PasswordCheckResponse> {
    return this.http.post<PasswordCheckResponse>(`${this.baseUrl}/check-strength`, request);
  }

  checkPasswordVulnerability(request: PasswordCheckRequest): Observable<PasswordCheckResponse> {
    return this.http.post<PasswordCheckResponse>(`${this.baseUrl}/check-vulnerability`, request);
  }

  generatePassword(): Observable<PasswordGeneratedResponse> {
    return this.http.post<PasswordGeneratedResponse>(`${this.baseUrl}/generate`, {});
  }
}
