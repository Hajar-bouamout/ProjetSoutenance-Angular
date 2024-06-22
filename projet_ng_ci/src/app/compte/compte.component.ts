import { Component, OnInit } from '@angular/core';
import { Compte } from '../model';
import { CompteService } from '../compte.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent implements OnInit {

  comptes: Compte[] = [];

  constructor(private compteService: CompteService, private authService: AuthService) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté à partir du service AuthService
    const idUser = this.authService.getIdUtilisateur();

    if (idUser) {
      // Appel du service pour récupérer les comptes de l'utilisateur par son ID
      this.compteService.getComptesUtilisateur(idUser).subscribe(
        (comptes: Compte[]) => {
          this.comptes = comptes;
          console.log('Comptes récupérés :', comptes);
        },
        (error) => {
          console.error('Erreur lors de la récupération des comptes :', error);
          // Gestion de l'erreur ici
        }
      );
    } else {
      console.error('ID utilisateur non défini.');
      // Gestion de l'erreur si l'ID utilisateur n'est pas disponible
    }
  }
}
