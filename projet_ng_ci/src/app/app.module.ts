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
import { PasswordComponent } from './password/password.component';
import { NotesComponent } from './notes/notes.component';
import { EditnoteComponent } from './editnote/editnote.component';



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
    PasswordComponent,
    NotesComponent,
    EditnoteComponent

    
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
