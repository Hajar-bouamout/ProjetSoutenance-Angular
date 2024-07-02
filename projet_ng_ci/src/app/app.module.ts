import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CompteListComponent } from './compte-list/compte-list.component';
import { CreateCompteComponent } from './create-compte/create-compte.component';

import { NotesComponent } from './notes/notes.component';
import { EditnoteComponent } from './editnote/editnote.component';
import { CompteEditComponent } from './compte-edit/compte-edit.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';
import { RequestResetPasswordAccountsComponent } from './request-reset-password-accounts/request-reset-password-accounts.component';
import { ResetPasswordAccountsComponent } from './reset-password-accounts/reset-password-accounts.component';
import { CheckPasswordComponent } from './check-password/check-password.component';



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    NavBarComponent,
    HomeComponent,
    UtilisateurComponent,
    CompteListComponent,
    CreateCompteComponent,
    NotesComponent,
    EditnoteComponent,
    CompteEditComponent,
    EditnoteComponent,
    AddNoteComponent,
    RequestResetPasswordComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
    RequestResetPasswordAccountsComponent,
    ResetPasswordAccountsComponent,
    CheckPasswordComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
