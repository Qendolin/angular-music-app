import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { Playlist } from 'src/app/shared';

@Component({
	selector: 'app-playlist-browser',
	templateUrl: './playlist-browser.component.html',
	styleUrls: ['./playlist-browser.component.css']
})
export class PlaylistBrowserComponent {
	playlists$: Observable<Playlist[]>;
	constructor(playlistServ: PlaylistService) {
		this.playlists$ = playlistServ.getPlaylists();
	}
}
