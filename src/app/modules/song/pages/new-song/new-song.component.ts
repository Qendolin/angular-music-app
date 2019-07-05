import { Component, ViewChild, ElementRef } from '@angular/core';
import { Song, Author } from 'src/app/shared';
import { Observable, of } from 'rxjs';
import { AuthorService, SongsService } from 'src/app/core/services';
import { take, startWith, map } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenreService } from 'src/app/core/services/genre.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

interface GenreChip {
	name: string;
	value: string;
}

@Component({
	selector: 'app-new-song',
	templateUrl: './new-song.component.html',
	styleUrls: ['./new-song.component.css']
})
export class NewSongComponent {
	authors$: Observable<Author[]>;
	genresAutocomp: GenreChip[];
	songForm: FormGroup;
	genres: GenreChip[] = [];

	separatorKeysCodes: number[] = [ENTER, COMMA];

	@ViewChild('genreInput', { static: false }) genreInput: ElementRef<HTMLInputElement>;
	@ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

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
			genres: [undefined],
			genreInput: [undefined]
		});

		this.songForm.get('genreInput').valueChanges.subscribe(genre => {
			this.searchGenres(genre);
		});

		this.genreServ.getGenres().subscribe(genres => {
			this.genresAutocomp = genres.map(g => ({
				name: g.name,
				value: g.name.toLowerCase()
			}));
		});
	}

	genreRemove(genre: GenreChip): void {
		const index = this.genres.indexOf(genre);

		if (index >= 0) {
			this.genres.splice(index, 1);
		}
	}

	genreAdd(event: MatChipInputEvent): void {
		if (!this.matAutocomplete.isOpen) {
			const input = event.input;
			const value = (event.value || '').trim();
			const lowerValue = value.toLowerCase();
			if (value && this.genres.find(g => g.value == lowerValue) == null) {
				this.genres.push({ name: value, value: lowerValue });
			}
			if (input) {
				input.value = '';
			}
		}
	}

	genreSelected(event: MatAutocompleteSelectedEvent): void {
		this.genres.push(event.option.value);
		this.genreInput.nativeElement.value = '';
	}

	searchGenres(input: string) {
		this.genreServ.searchGenres(input).subscribe(genres => {
			this.genresAutocomp = genres.map<GenreChip>(g => ({
				name: g.name,
				value: g.name.toLowerCase()
			}));
		});
	}

	addSong() {
		if (this.songForm.invalid) return;
		let song = this.songForm.value;
		song.genres = this.genres.map(g => g.value);
		delete song.genreInput;
		console.log(song);
		this.songServ
			.addSong(song)
			.pipe(take(1))
			.subscribe();
	}
}
