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
    if (typeof idUser === 'string') {
      this.noteService.getNotesByUser(idUser).subscribe(
        (data) => {
          this.notes = data.map(note => ({
            ...note,
            showContent: false // Initialisez showContent à false
          }));
        },
        (error) => {
          console.error('Erreur lors du chargement des notes', error);
        }
      );
    } else {
      console.error('ID utilisateur non valide');
    }}

  toggleContent(note: Note): void {
    note.showContent = !note.showContent;
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

  editNote(note: Note): void {
    this.router.navigate(['/edit-note', note.id]);
  }

  navigateToAddNote(): void {
    this.router.navigate(['/add']);
  }
  
  showNoteContent(note: Note): void {
    if (note.decryptedContent) {
      note.showContent = !note.showContent;
    } else {
      this.noteService.decryptNoteContent(note.id!).subscribe(content => {
        note.decryptedContent = content;
        note.showContent = true;
      }, error => {
        console.error('Erreur lors du déchiffrement du contenu de la note :', error);
      });
    }
  }

  copyContent(content: string): void {
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        alert('Contenu copié dans le presse-papiers !');
      }).catch(err => {
        console.error('Erreur lors de la copie du contenu : ', err);
      });
    } else {
      console.error('Contenu non défini');
    }
  }
  decryptNoteContent(noteId: string): void {
    this.noteService.decryptNoteContent(noteId).subscribe(
      (response: any) => {
        console.log('Réponse reçue:', response);
        if (typeof response === 'string') {
          console.log('Contenu déchiffré:', response);
          // Traitez le contenu déchiffré ici
        } else {
          console.error('Format de réponse inattendu:', response);
        }
      },
      error => {
        console.error('Erreur lors du déchiffrement du contenu de la note :', error);
        // Inspectez la structure de l'erreur
        console.log('Détails de l\'erreur :', error.message);
      }
    );
  }
}
















