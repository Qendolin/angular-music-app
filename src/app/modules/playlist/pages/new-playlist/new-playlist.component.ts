import { Component } from '@angular/core';
import { Playlist } from 'src/app/shared';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-new-playlist',
	templateUrl: './new-playlist.component.html',
	styleUrls: ['./new-playlist.component.css']
})
export class NewPlaylistComponent {
	constructor(private playlistServ: PlaylistService, private router: Router) {}

	addPlaylist(playlist: Playlist) {
		this.playlistServ.addPlaylist(playlist).subscribe(() => {
			this.router.navigateByUrl('/playlists');
		});
	}
}
