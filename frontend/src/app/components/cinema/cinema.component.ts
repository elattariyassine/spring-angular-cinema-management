import { Component, OnInit } from '@angular/core';
import { Ville } from 'src/app/_shared/models/ville';
import { VilleService } from 'src/app/_shared/services/ville.service';
import { Cinema } from 'src/app/_shared/models/cinema';
import { CinemaService } from 'src/app/_shared/services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  villes: Ville[] = [];
  cinemas: Cinema[] = [];

  constructor(private villeService: VilleService,
              private cinemasService: CinemaService) { }

  ngOnInit() {
    this.getVilles();
  }
  getVilles(){
    this.villeService.findAll().subscribe(res => {
      this.villes = res;
    });
  }
  onGetCinemas(ville: Ville){
    console.log(ville);
    this.cinemasService.getCinemas(ville).subscribe(res => {
      this.cinemas = res;
      console.log(res);
    });
  }
}
