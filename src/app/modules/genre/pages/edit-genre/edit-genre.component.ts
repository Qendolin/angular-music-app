import { Component, OnInit } from '@angular/core';
import { Genre, Song } from 'src/app/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from 'src/app/core/services/genre.service';
import { Observable } from 'rxjs';
import { SongsService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-edit-genre',
	templateUrl: './edit-genre.component.html',
	styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {
	genre: Genre;
	genreFormGroup: FormGroup;
	connectedSongs$: Observable<Song[]>;
	constructor(
		private genreServ: GenreService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private songServ: SongsService,
		private snackBar: MatSnackBar,
		private translateServ: TranslateService,
		private router: Router
	) {}

	ngOnInit(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.connectedSongs$ = this.songServ.getSongsFiltered({
			genre: id
		});
		this.genreServ.getGenre(id).subscribe(genre => {
			this.genre = genre;
			this.genreFormGroup = this.formBuilder.group({
				name: [genre.name, Validators.required]
			});
		});
	}

	saveEdits() {
		this.genre.name = this.genreFormGroup.value.name;
		this.genreServ.updateGenre(this.genre).subscribe(() => {
			this.translateServ.get('GENRE.MSGS.SAVED').subscribe(res => {
				this.snackBar.open(res, undefined, { duration: 500 });
			});
		});
	}

	deleteGenre() {
		this.genreServ.deleteGenre(this.genre.id).subscribe(() => {
			this.router.navigateByUrl('/genres');
		});
	}
}
