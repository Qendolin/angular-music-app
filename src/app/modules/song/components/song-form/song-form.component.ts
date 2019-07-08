import {
	Component,
	ViewChild,
	ElementRef,
	Output,
	EventEmitter,
	Input,
	OnInit
} from '@angular/core';
import { Song, Author, Genre } from 'src/app/shared';
import { Observable, of } from 'rxjs';
import { AuthorService, SongsService } from 'src/app/core/services';
import { take, startWith, map } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenreService } from 'src/app/core/services/genre.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { TitleCasePipe } from '@angular/common';

@Component({
	selector: 'app-song-form',
	templateUrl: './song-form.component.html',
	styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {
	@Input() song: Song;
	@Output('songChanged') songEmitter = new EventEmitter<Song>();

	authors$: Observable<Author[]>;
	genresAutocomp: Genre[];
	songFormGroup: FormGroup;
	genres: Genre[];

	separatorKeysCodes: number[] = [ENTER, COMMA];

	@ViewChild('genreInput', { static: false }) genreInput: ElementRef<HTMLInputElement>;
	@ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
	constructor(
		authorServ: AuthorService,
		private fromBuilder: FormBuilder,
		private genreServ: GenreService,
		private titleCase: TitleCasePipe
	) {
		this.authors$ = authorServ.getAuthors();

		this.genreServ.getGenres().subscribe(genres => {
			this.genresAutocomp = genres.map(g => ({
				name: this.titleCase.transform(g.name),
				id: g.id
			}));
		});
	}

	ngOnInit() {
		this.song = this.song || <Song>{};

		this.genres = this.song.genres || [];

		this.songFormGroup = this.fromBuilder.group({
			name: [this.song.name, [Validators.required, Validators.maxLength(100)]],
			url: [
				this.song.url,
				[
					Validators.required,
					Validators.pattern(
						/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
					),
					Validators.maxLength(200)
				]
			],
			length: [
				this.song.length,
				[Validators.required, Validators.min(1), Validators.max(300)]
			],
			author: [this.song.author, [Validators.required]],
			genres: [this.song.genres],
			genreInput: [undefined],
			public: [this.song.public]
		});

		this.songFormGroup.get('genreInput').valueChanges.subscribe(genre => {
			this.searchGenres(genre);
		});
	}

	genreRemove(genre: Genre): void {
		const index = this.genres.indexOf(genre);

		if (index >= 0) {
			this.genres.splice(index, 1);
		}
	}

	genreAdd(event: MatChipInputEvent): void {
		if (!this.matAutocomplete.isOpen) {
			const input = event.input;
			const value = (event.value || '').trim();
			const titleValue = this.titleCase.transform(value);
			if (value && this.genres.find(g => g.name == titleValue) == null) {
				this.genres.push({ name: value, id: null });
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
			this.genresAutocomp = genres.map<Genre>(g => ({
				name: this.titleCase.transform(g.name),
				id: g.id
			}));
		});
	}

	emitSong() {
		if (this.songFormGroup.invalid) return;
		let song = this.songFormGroup.value;
		song.genres = this.genres.map(g => ({ id: g.id, name: g.name }));
		song.id = this.song.id;
		delete song.genreInput;
		console.log('Emitting Song:', <Song>song);
		this.songEmitter.emit(<Song>song);
	}
}
