import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { Note } from '../model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLogged()) {
      this.router.navigate(['/connexion']);
    } else {
      this.loadNotes();
    }
  }

  loadNotes() {
    const idUser = this.authService.getIdUtilisateur();
    if (typeof idUser === 'string') {  // Vérifiez que userId est une chaîne de caractères
      this.noteService.getNotesByUser(idUser).subscribe(
        (data) => {
          this.notes = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des notes', error);
        }
      );
    } else {
      console.error('ID utilisateur non valide');
    }
  }


  deleteNote(note: Note) {
    if (!note.id) {
      console.error('L\'identifiant de la note est indéfini');
      return;
    }

    this.noteService.deleteNote(note.id).subscribe(
      () => {
        console.log('Note supprimée avec succès');
        this.notes = this.notes.filter(n => n.id !== note.id); // Retirer la note de la liste affichée
      },
      (error) => {
        console.error('Erreur lors de la suppression de la note', error);
      }
    );
  }

  editNote(note: Note) {
    console.log('Édition de la note :', note);
    this.router.navigate(['/edit-note', note.id]); 
  }

  
}

















