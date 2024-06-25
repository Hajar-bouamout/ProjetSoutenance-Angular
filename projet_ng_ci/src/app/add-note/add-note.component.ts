import { Component } from '@angular/core';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { Note } from '../model';
import { AuthService } from '../auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {
  note: any = {
    nom: '',
    description: '',
    dateAjout: new Date(),
    
    idUser: ''
  };
  
  constructor(private noteService: NoteService, private authService: AuthService,private router: Router) { }
 
  ngOnInit(): void {
    // Initialisation ou chargement des données nécessaires au chargement du composant
  }

  onSubmit(): void {
    // Avant de créer la note, assurez-vous que le contenu n'est pas null ou vide
    if (!this.note.contenu) {
      console.error('Le contenu de la note est requis.');
      return;
    }

    // Assurez-vous de récupérer l'ID utilisateur correctement
    this.note.idUser = this.authService.getIdUtilisateur();

    // Appelez le service pour créer la note
    this.noteService.createNote(this.note).subscribe(
      (response: HttpResponse<Note>) => {
        console.log('Note créée avec succès', response);
        // Réinitialisez les champs du formulaire ou effectuez d'autres actions nécessaires après la création de la note
        this.note = {
          nom: '',
          description: '',
          dateAjout: new Date(),
          dateModif: new Date(),
          idUser: ''
        };
         // Après la création, naviguez vers la liste des notes
         this.router.navigate(['/notes']); 
      },
      (error) => {
        console.error('Erreur lors de la création de la note', error);
        // Affichez l'erreur exacte dans la console pour mieux la comprendre
      }
    );
  }


  }

