import { Component, OnInit } from '@angular/core';
import { Ville } from 'src/app/_shared/models/ville';
import { VilleService } from 'src/app/_shared/services/ville.service';
import { Cinema } from 'src/app/_shared/models/cinema';
import { CinemaService } from 'src/app/_shared/services/cinema.service';
import { Salle } from 'src/app/_shared/models/salle';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  currentVille: Ville;
  villes: Ville[] = [];
  cinemas: Cinema[] = [];
  salles: Salle[] = [];
  currentProjection;
  currentCinema;

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
  onGetCinemas(ville){
    this.currentVille = ville;
    this.salles = undefined; 
    this.cinemasService.getCinemas(ville).subscribe(res => {
      this.cinemas = res;
      console.log(res);
    });
  }
  onGetSalles(cinema){
    this.currentCinema = cinema;
    this.cinemasService.getSallesByCinema(cinema).subscribe(data => {
      this.salles = data;
      this.salles.forEach(s => {
        this.cinemasService.getProjectionsBySalle(s)
          .subscribe((res: any) => {
            console.log(res);
            s.projections = res;
          });
      });
    });
    console.log('-------------------------------------------------');
    console.log(this.salles);
    console.log('-------------------------------------------------');
  }
  getImage(salle){
    console.log(salle);
    return this.cinemasService.imageUrl + salle.projections[0].film.id;
  }
  onGetTicketsPlaces(p){
    this.currentProjection = p;
    this.cinemasService.getTicketsPlacesForAprojection(p).subscribe(res => {
      this.currentProjection.tickets = res;
      console.log("((((((())))))))))))))))))))");
      console.log(res);
      console.log("((((((())))))))))))))))))))");
    });
  }
}
