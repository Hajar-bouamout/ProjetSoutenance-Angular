import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compte } from './model';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

 
 

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les comptes de l'utilisateur par son ID
  getComptesUtilisateur(idUser: string): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${environment.apiUrl}/compte/${idUser}`);
  }
}
