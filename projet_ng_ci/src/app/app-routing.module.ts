import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CompteListComponent } from './compte-list/compte-list.component';



const routes: Routes = [
  {path: "connexion", component: ConnexionComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "home", component:HomeComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path:"compte", component:CompteListComponent},
  { path: 'comptes/utilisateur/:idUser', component: CompteListComponent }

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
