import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cinema } from '../models/cinema';
import { map } from 'rxjs/operators';
import { Salle } from '../models/salle';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private Checkout = 'http://localhost:8080/payerTickets';
  imageUrl = 'http://localhost:8080/imageFilm/';

  constructor(private http: HttpClient) { }

  getCinemas(ville: getCinemasAPI): Observable<Cinema[]> {
    return this.http.get<getCinemas>(ville._links.cinemas.href)
            .pipe(
              map(data => data._embedded.cinemas)
            )
  }
  getSallesByCinema(cinema: getSallesAPI): Observable<Salle[]>{
    return this.http.get<getSalles>(cinema._links.salle.href)
           .pipe(
             map(data => data._embedded.salles)
           )
  }
  getProjectionsBySalle(salle){
    let url:string = salle._links.projections.href.replace("{?projection}","");
    return this.http.get(`${url}?projection=p1`)
            .pipe(map((data: any) => data._embedded.projections));
  }
  getTicketsPlacesForAprojection(p){
    let url:string = p._links.tickets.href.replace("{?projection}","");
    console.log(url);
    return this.http.get(`${url}?projection=ticketProj`)
            .pipe(map((data: any) => data._embedded.tickets));
  }
  payerTickets(formData){
    return this.http.post(this.Checkout, formData);
  }
}
interface getCinemasAPI {
  _links:{
    cinemas: {
      href: string
    }
  }
}
interface getCinemas{
  _embedded:{
    cinemas: Cinema[]
  }
}
interface getSallesAPI{
  _links:{
    salle: {
      href:string
    }
  }
}
interface getSalles{
  _embedded:{
    salles: Salle[]
  }
}