import { Component, OnInit } from '@angular/core';
import { Song, Author } from 'src/app/shared';
import { Observable } from 'rxjs';
import { AuthorService } from 'src/app/core/services/author.service';
import { SongsService } from 'src/app/core/services';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-new-song',
	templateUrl: './new-song.component.html',
	styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
	authors$: Observable<Author[]>;
	songForm: FormGroup;

	constructor(
		authorServ: AuthorService,
		private songServ: SongsService,
		translate: TranslateService
	) {
		this.authors$ = authorServ.getAuthors();
		translate.addLangs(['de']);
		translate.setDefaultLang('de');
		translate.use('de');

		this.songForm = new FormGroup({
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(100)
			]),
			url: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
				),
				Validators.maxLength(200)
			]),
			length: new FormControl('', [
				Validators.required,
				Validators.min(1),
				Validators.max(300)
			]),
			author: new FormControl('', [Validators.required])
		});
	}

	ngOnInit() {}

	addSong(event: any) {
		event.preventDefault();
		if (this.songForm.invalid) return;
		let song = new Song();
		song.author.name = this.songForm.value.author;
		song.length = this.songForm.value.length;
		song.name = this.songForm.value.name;
		song.url = this.songForm.value.url;
		this.songServ
			.addSong(song)
			.pipe(take(1))
			.subscribe();
	}
}
