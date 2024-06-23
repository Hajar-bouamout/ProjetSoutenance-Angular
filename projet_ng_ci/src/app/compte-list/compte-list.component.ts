import { Component, OnInit, Input } from '@angular/core';
import { CompteResponse } from '../model';
import { CompteService } from './compte.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-compte-list',
  templateUrl: './compte-list.component.html',
  styleUrls: ['./compte-list.component.css'] // Corrigé : 'styleUrls' au lieu de 'styleUrl'
})
export class CompteListComponent implements OnInit {
  idUser: string | undefined;
  comptes: CompteResponse[] = [];
 

  constructor(
    private compteService: CompteService,
    private authService: AuthService,
    private router: Router
  ){}



//   ngOnInit(): void {
//     // Utilisation du service ici, par exemple :
//     this.compteService.getAllComptes().subscribe(comptes => {
//       console.log('Comptes récupérés :', comptes);
//     });
//   }



//   editCompte(compte: CompteResponse): void {
//     // Logique pour modifier un compte
//     console.log('Modification du compte :', compte);
//   }

//   deleteCompte(id?: string): void {
//     if (id) {
//       this.compteService.deleteCompte(id).subscribe(() => {
//         this.comptes = this.comptes.filter(compte => compte.id !== id);
//       });
//     }
//   }
// }

ngOnInit(): void {
  const currentUser = this.authService.getCurrentUser();
  if (currentUser) {
    this.idUser = currentUser.id;
    console.log('ID de l\'utilisateur connecté :', this.idUser);

    if (this.idUser) {
      this.compteService.getComptesByUserId(this.idUser).subscribe(
        (data: CompteResponse[]) => {
          this.comptes = data;
          console.log('Comptes récupérés :', this.comptes);
        },
        (error) => {
          console.error('Erreur lors de la récupération des comptes :', error);
        }
      );
    } else {
      console.error('ID utilisateur non défini');
    }
  } else {
    console.error('Aucun utilisateur connecté');
  }
}
createCompte(): void {
  this.router.navigate(['/compte/ajout']);
}

editCompte(compte: CompteResponse): void {
  console.log('Modification du compte :', compte);
}

deleteCompte(id?: string): void {
  if (id) {
    this.compteService.deleteCompte(id).subscribe(() => {
      this.comptes = this.comptes.filter(compte => compte.id !== id);
    });
  }
}
}
