import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CompteListComponent } from './compte-list/compte-list.component';
import { CreateCompteComponent } from './create-compte/create-compte.component';
import { NotesComponent } from './notes/notes.component';
import { CompteEditComponent } from './compte-edit/compte-edit.component';
import { EditnoteComponent } from './editnote/editnote.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';



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
  { path: 'compte/update/:id', component: CompteEditComponent },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: '**', redirectTo: '/dashboard' }
  { path: 'edit-note/:id', component: EditnoteComponent },
  { path: 'add', component: AddNoteComponent },
  { path: 'request-reset-password', component: RequestResetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  
  { path: 'reset-password-success', component: ResetPasswordSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
