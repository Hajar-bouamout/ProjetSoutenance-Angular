import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CompteListComponent } from './compte-list/compte-list.component';
import { CreateCompteComponent } from './create-compte/create-compte.component';
import { NotesComponent } from './notes/notes.component';
import { EditnoteComponent } from './editnote/editnote.component';
import { AddNoteComponent } from './add-note/add-note.component';



const routes: Routes = [
  {path: "connexion", component: ConnexionComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "home", component:HomeComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path:"compte", component:CompteListComponent},
  { path: 'comptes/utilisateur/:idUser', component: CompteListComponent },
  { path: '', redirectTo: '/comptes', pathMatch: 'full' },
 { path: 'comptes', component: CompteListComponent },
 { path: 'compte/ajout', component: CreateCompteComponent },
 { path: 'create-compte', component: CreateCompteComponent },
  { path: '', redirectTo: '/compte', pathMatch: 'full' },
  { path: 'notes', component: NotesComponent },
  { path: 'edit-note/:id', component: EditnoteComponent },
  { path: 'add', component: AddNoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
