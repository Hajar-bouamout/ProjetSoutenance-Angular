import { Component } from '@angular/core';
import { Note } from '../model';
import { NoteService } from '../note.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrl: './editnote.component.css'
})
export class EditnoteComponent {

  note: Note = new Note();
  id?: string;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.noteService.getNoteById(this.id).subscribe(
        data => this.note = data,
        error => console.error('Erreur lors de la récupération de la note', error)
      );
    } else {
      console.error('ID de la note non trouvé dans la route');
      // Rediriger ou gérer ce cas comme vous le souhaitez
    }
  }

  onSubmit() {
    if (this.id) {
      this.noteService.updateNote(this.id, this.note).subscribe(
        updatedNote => {
          console.log('Note mise à jour avec succès', updatedNote);
          this.router.navigate(['/notes']);
        },
        error => console.error('Erreur lors de la mise à jour de la note', error)
      );
    } else {
      console.error('ID de la note non défini');
      // Gérer ce cas comme vous le souhaitez
    }
  }
}
