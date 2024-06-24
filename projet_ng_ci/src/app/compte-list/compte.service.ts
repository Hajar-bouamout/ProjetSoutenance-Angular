import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CompteResponse, CreateCompteRequest, PasswordCheckRequest, PasswordCheckResponse, PasswordGeneratedResponse } from '../model';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CompteService {
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

   createCompte(request: CreateCompteRequest): Observable<string> {
   return this.http.post<string>(`${this.baseUrl}/ajout`, request);
   }

   decryptPassword(compteId: string): Observable<string> {
  return this.http.post<string>(`${this.baseUrl}/decryptPassword`, { compteId });
  }

updateCompte(id: string, compte: CompteResponse): Observable<CompteResponse> {
   return this.http.put<CompteResponse>(`${this.baseUrl}/update/${id}`, compte);
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