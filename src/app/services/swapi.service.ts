import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}/`);
  }

  getMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/films/`);
  }

  getSpecies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/species/`);
  }

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles/`);
  }

  getStarships(): Observable<any> {
    return this.http.get(`${this.baseUrl}/starships/`);
  }
  getMovieByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }

  getVehicleByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }

  getStarshipByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
  getSpeciesDetails(url: string) {
    return this.http.get(url);
  }
}
