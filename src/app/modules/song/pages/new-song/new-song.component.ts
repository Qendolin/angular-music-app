import { Component, OnInit } from '@angular/core';
import { Song, Author } from 'src/app/shared';
import { Observable } from 'rxjs';
import { AuthorService } from 'src/app/core/services/author.service';
import { SongsService } from 'src/app/core/services';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-new-song',
	templateUrl: './new-song.component.html',
	styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
	song = new Song();
	authors$: Observable<Author[]>;
	constructor(authorServ: AuthorService, private songServ: SongsService) {
		this.authors$ = authorServ.getAuthors();
	}

	ngOnInit() {}

	addSong(event: any) {
		event.preventDefault();
		this.songServ
			.addSong(this.song)
			.pipe(take(1))
			.subscribe();
		this.song = new Song();
	}
}
