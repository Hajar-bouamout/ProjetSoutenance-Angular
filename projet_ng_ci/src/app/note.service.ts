import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './model';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from './environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NoteService {


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNotesByUser(idUser: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/note/utilisateur/${idUser}`);
  }
 
  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/note/${id}`);
  }

  
  updatePartielle(id: string, changes: Partial<Note>): Observable<Note> {
    const url = `${this.apiUrl}/note/${id}`;
    return this.http.patch<Note>(url, changes);
  }

  deleteNote(noteId: string): Observable<void> {
    const url = `${this.apiUrl}/note/${noteId}`;
    return this.http.delete<void>(url);
  }
 
  // createNote(note: Note): Observable<HttpResponse<Note>> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   return this.http.post<Note>(`${this.apiUrl}/note/ajout`, note, { headers: headers, observe: 'response' })
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // private handleError(error: any): Observable<never> {
  //   console.error('Erreur : ', error);
  //   return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
  // }

  createNote(note: Note): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<any>(`${this.apiUrl}/note/ajout`, note, { headers }).pipe(
      catchError(error => {
        if (error.status === 201) {
          // La création s'est bien déroulée
          console.log('Note créée avec succès');
          return of(error.body); // Retourner la réponse du serveur
        } else {
          // Une autre erreur s'est produite
          console.error('Erreur lors de la création de la note :', error);
          return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      })
    );
  }


}


