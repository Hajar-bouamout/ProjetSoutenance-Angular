import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  
  requestPasswordReset(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/utilisateur/request-reset`, {}, { params, responseType: 'text' });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const params = new HttpParams().set('token', token).set('newPassword', newPassword);
    return this.http.post(`${this.baseUrl}/utilisateur/reset`, {}, { params, responseType: 'text' });
  }
  
  checkPasswordStrength(newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/password/compte/check-strength`, { password: newPassword });
  }

  checkPasswordVulnerability(newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/password/compte/check-vulnerability`, { password: newPassword });
  }
}
