import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ville } from '../models/ville';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  private baseUrl = 'http://localhost:8080/api/villes';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Ville[]>{
    return this.http.get<VilleResponse>(this.baseUrl)
    .pipe(
      map(ville => ville._embedded.villes)
    );
  }
}

interface VilleResponse{
  _embedded:{
    villes: Ville[]
  }
}