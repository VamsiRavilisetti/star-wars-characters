import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from 'src/app/services/swapi.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  species: any = '';
  movies: string[] = [];
  vehicles: string[] = [];
  starships: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private swapiService: SwapiService
  ) { }

  ngOnInit(): void {
    // Get the character ID from the route
    const characterId: any = this.route.snapshot.paramMap.get('id');

    // Fetch character details by ID
    this.swapiService.getCharacter(+characterId).subscribe((character: any) => {
      this.character = character;

      // Fetch species name
      if (character.species.length > 0) {
        this.swapiService.getSpeciesDetails(character.species[0]).subscribe((speciesData: any) => {
          this.species = speciesData.name;
        });
      }

      // Fetch movies the character appeared in
      character.films.forEach((filmUrl: string) => {
        this.swapiService.getMovieByUrl(filmUrl).subscribe((filmData: any) => {
          this.movies.push(filmData.title);
        });
      });

      // Fetch vehicles associated with the character
      character.vehicles.forEach((vehicleUrl: string) => {
        this.swapiService.getVehicleByUrl(vehicleUrl).subscribe((vehicleData: any) => {
          this.vehicles.push(vehicleData.name);
        });
      });

      // Fetch starships associated with the character
      character.starships.forEach((starshipUrl: string) => {
        this.swapiService.getStarshipByUrl(starshipUrl).subscribe((starshipData: any) => {
          this.starships.push(starshipData.name);
        });
      });
    });
  }
}
