import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cinema } from '../models/cinema';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  // private baseUrl = 'http://localhost:8080/api/villes';

  constructor(private http: HttpClient) { }

  getCinemas(ville: getCinemas) {
    return this.http.get(ville._links.cinemas);
  }
}
interface getCinemas {
  _links:{
    cinemas: Cinema[]
  }
}
