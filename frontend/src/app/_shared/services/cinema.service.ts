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

  getCinemas(ville: getCinemasAPI): Observable<Cinema[]> {
    return this.http.get<getCinemas>(ville._links.cinemas.href)
            .pipe(
              map(data => data._embedded.cinemas)
            )

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