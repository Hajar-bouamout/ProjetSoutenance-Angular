import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './model';
import { Observable } from 'rxjs';
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
  // updateNote(id: string, note: Note): Observable<Note> {
  //   return this.http.put<Note>(`${this.apiUrl}/note/${id}`, note);
  // }
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
}
