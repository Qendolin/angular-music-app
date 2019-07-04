import { Component, OnInit } from '@angular/core';
import { Song, Author, Genre } from 'src/app/shared';
import { Observable, of } from 'rxjs';
import { AuthorService, SongsService } from 'src/app/core/services';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GenreService } from 'src/app/core/services/genre.service';
import { TagModel } from 'ngx-chips/core/accessor';

@Component({
	selector: 'app-new-song',
	templateUrl: './new-song.component.html',
	styleUrls: ['./new-song.component.css']
})
export class NewSongComponent {
	authors$: Observable<Author[]>;
	autocompGenres: TagModel[];
	songForm: FormGroup;

	constructor(
		authorServ: AuthorService,
		private songServ: SongsService,
		private fromBuilder: FormBuilder,
		private genreServ: GenreService
	) {
		this.authors$ = authorServ.getAuthors();

		this.songForm = this.fromBuilder.group({
			name: [undefined, [Validators.required, Validators.maxLength(100)]],
			url: [
				undefined,
				[
					Validators.required,
					Validators.pattern(
						/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
					),
					Validators.maxLength(200)
				]
			],
			length: [undefined, [Validators.required, Validators.min(1), Validators.max(300)]],
			author: [undefined, [Validators.required]],
			genres: [undefined]
		});

		this.genreServ.getGenres().subscribe(genres => {
			this.autocompGenres = genres.map<TagModel>(g => ({
				display: g.name,
				value: g.name.toLowerCase()
			}));
		});
	}

	onGenreAdd(tag: TagModel): Observable<TagModel> {
		return of(tag.toLowerCase());
	}

	searchGenres(input: string) {
		this.genreServ.searchGenres(input).subscribe(genres => {
			this.autocompGenres = genres.map<TagModel>(g => ({
				display: g.name,
				value: g.name.toLowerCase()
			}));
		});
	}

	addSong() {
		if (this.songForm.invalid) return;

		let song = <Song>this.songForm.value;
		this.songServ
			.addSong(song)
			.pipe(take(1))
			.subscribe();
	}
}
