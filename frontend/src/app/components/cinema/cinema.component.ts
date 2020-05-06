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
  selectedTickets;

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
    });
  }
  onGetSalles(cinema){
    this.currentCinema = cinema;
    this.cinemasService.getSallesByCinema(cinema).subscribe(data => {
      this.salles = data;
      this.salles.forEach(s => {
        this.cinemasService.getProjectionsBySalle(s)
          .subscribe((res: any) => {
            s.projections = res;
          });
      });
    });
  }
  getImage(salle){
    return this.cinemasService.imageUrl + salle.projections[0].film.id;
  }
  onGetTicketsPlaces(p){
    this.currentProjection = p;
    this.cinemasService.getTicketsPlacesForAprojection(p).subscribe(res => {
      this.currentProjection.tickets = res;
      this.selectedTickets = [];
    });
  }
  onSelectTicket(t){
    if(!t.selected){
      t.selected = true;  
      this.selectedTickets.push(t);
    }
    else{
      t.selected = false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t), 1);
    }
  }
  getTicketClass(t){
    let str="btn tickets ";
    if(t.reservee){
      str += "btn-danger";
    }
    else if(t.selected){
      str += "btn-warning";
    }else{
      str += "btn-success";
    }
    return str;
  }
  onPayTicket(dataForm){
    let tickets = [];
    this.selectedTickets.forEach(t => {
      tickets.push(t.id);
    });
    dataForm.tickets = tickets;
    this.cinemasService.payerTickets(dataForm)
      .subscribe(re => {
        alert('Tickets réservés avec succès!');
        this.onGetTicketsPlaces(this.currentProjection);
      });
  }
}
