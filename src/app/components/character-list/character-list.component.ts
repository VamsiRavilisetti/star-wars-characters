import { Component, OnInit } from '@angular/core';
import { SwapiService } from 'src/app/services/swapi.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];

  movies: any[] = [];
  species: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];

  // Filter object to store selected criteria
  filter: any = {
    selectedMovies: [],
    selectedSpecies: [],
    selectedVehicles: [],
    selectedStarships: [],
    birthYearRange: { start: '', end: '' }
  };

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    // Fetch all movies, species, vehicles, starships
    this.swapiService.getMovies().subscribe((data: any) => this.movies = data.results);
    this.swapiService.getSpecies().subscribe((data: any) => this.species = data.results);
    this.swapiService.getVehicles().subscribe((data: any) => this.vehicles = data.results);
    this.swapiService.getStarships().subscribe((data: any) => this.starships = data.results);

    // Fetch characters
    this.swapiService.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
      this.filteredCharacters = this.characters;
    });
  }

  applyFilter(): void {
    this.filteredCharacters = this.characters.filter(character => {
      let match = true;

      // Filter by movies
      if (this.filter.selectedMovies.length > 0) {
        match = this.filter.selectedMovies.some((movieUrl: any) => character.films.includes(movieUrl));
      }

      // Filter by species
      if (match && this.filter.selectedSpecies.length > 0) {
        match = this.filter.selectedSpecies.includes(character.species[0]);
      }

      // Filter by vehicles
      if (match && this.filter.selectedVehicles.length > 0) {
        match = this.filter.selectedVehicles.some((vehicleUrl: any) => character.vehicles.includes(vehicleUrl));
      }

      // Filter by starships
      if (match && this.filter.selectedStarships.length > 0) {
        match = this.filter.selectedStarships.some((starshipUrl: any) => character.starships.includes(starshipUrl));
      }

      // Filter by birth year range
      if (match && this.filter.birthYearRange.start && this.filter.birthYearRange.end) {
        const birthYear = this.convertBirthYearToNumber(character.birth_year);
        const startYear = this.convertBirthYearToNumber(this.filter.birthYearRange.start);
        const endYear = this.convertBirthYearToNumber(this.filter.birthYearRange.end);

        match = birthYear >= startYear && birthYear <= endYear;
      }

      return match;
    });
  }

  // Convert birth year from string to a number (handling BBY and ABY)
  convertBirthYearToNumber(birthYear: string): number {
    if (birthYear.includes('BBY')) {
      return -parseFloat(birthYear);
    } else if (birthYear.includes('ABY')) {
      return parseFloat(birthYear);
    }
    return 0;
  }
}