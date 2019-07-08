import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/shared';
import { GenreService } from 'src/app/core/services/genre.service';

@Component({
	selector: 'app-genre-browser',
	templateUrl: './genre-browser.component.html',
	styleUrls: ['./genre-browser.component.css']
})
export class GenreBrowserComponent {
	genres$: Observable<Genre[]>;
	constructor(genreServ: GenreService) {
		this.genres$ = genreServ.getGenres();
	}
}
