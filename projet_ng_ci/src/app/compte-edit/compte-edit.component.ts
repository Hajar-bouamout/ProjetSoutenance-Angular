import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompteService } from '../compte.service';
import { CompteResponse } from '../model';

@Component({
  selector: 'app-compte-edit',
  templateUrl: './compte-edit.component.html',
  styleUrls: ['./compte-edit.component.css']
})
export class CompteEditComponent implements OnInit {
  editCompteForm: FormGroup;
  compteId: string;
  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private compteService: CompteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editCompteForm = this.formBuilder.group({
      platformName: ['', Validators.required],
      platformDescription: [''],
      username: ['', Validators.required],
      urlAdress: [''],
      password: ['', [Validators.required, Validators.minLength(12)]],
      updateDate: [new Date().toISOString().split('T')[0], Validators.required]
    });

    this.compteId = '';
  }

  ngOnInit(): void {
    this.compteId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchCompteDetails(this.compteId);
  }

  private fetchCompteDetails(id: string): void {
    this.compteService.getCompteById(id).subscribe(
      (compte: CompteResponse) => {
        this.editCompteForm.patchValue(compte);
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération du compte : ' + error.message;
      }
    );
  }

  onSubmit(): void {
    if (this.editCompteForm.valid) {
      const updateRequest: CompteResponse = this.editCompteForm.value;

      this.compteService.updateCompte(this.compteId, updateRequest).subscribe(
        () => {
          this.router.navigate(['/comptes']); // Redirection vers la liste des comptes après la mise à jour
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la mise à jour du compte : ' + error.message;
        }
      );
    }
  }
}
