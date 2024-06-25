import { Component, OnInit } from '@angular/core';
import { Note } from '../model';
import { NoteService } from '../note.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrl: './editnote.component.css'
})
export class EditnoteComponent implements OnInit  {
  id: string = ''; // Assurez-vous que l'ID est initialisé avec une chaîne vide pour éviter les problèmes d'initialisation
  note: Note = {
    nom: '',
    description: '',
    dateAjout: new Date(),
    dateModif: new Date(),
    contenu: '',
    idUser: '',
    publicKey: ''
  };

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute) {
      this.id = idFromRoute; // Assurez-vous que l'ID est assigné uniquement si idFromRoute n'est pas null
      console.log('ID de la note à modifier :', this.id);
      // Charger les détails de la note à modifier
      this.loadNote();
    } else {
      console.error('Aucun ID trouvé dans les paramètres de l\'URL.');
      // Gérer le cas où l'ID n'est pas présent dans l'URL
    }
  }

  loadNote(): void {
    if (this.id) {
      this.noteService.getNoteById(this.id).subscribe(
        (note) => {
          this.note = note;
        },
        (error) => {
          console.error('Erreur lors du chargement de la note', error);
        }
      );
    }
  }



  updatePartiel(): void {
    if (this.id) { // Vérifiez que l'ID est défini avant de continuer
      const changes: Partial<Note> = {
        nom: this.note.nom,
        description: this.note.description,
        contenu: this.note.contenu,
        dateModif: new Date() // Mettre à jour la date de modification côté frontend
      };
  
      // Appelez le service pour mettre à jour la note
      this.noteService.updatePartielle(this.id, changes).subscribe(
        (updatedNote) => {
          console.log('Note mise à jour avec succès', updatedNote);
          this.router.navigate(['/notes']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la note', error);
          // Gérer l'erreur ici selon les besoins (affichage d'un message d'erreur, etc.)
        }
      );
    } else {
      console.error('ID de la note non défini.');
      // Gérer le cas où l'ID n'est pas défini (ceci est plus une sauvegarde, normalement bien géré dans ngOnInit())
    }
  }
}
