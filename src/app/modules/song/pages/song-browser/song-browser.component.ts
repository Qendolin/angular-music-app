import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from 'src/app/shared';
import { SongsService } from 'src/app/core/services';

@Component({
	selector: 'app-song-browser',
	templateUrl: './song-browser.component.html',
	styleUrls: ['./song-browser.component.css']
})
export class SongBrowserComponent {
	songs$: Observable<Song[]>;
	constructor(songServ: SongsService) {
		this.songs$ = songServ.getSongs();
	}
}
