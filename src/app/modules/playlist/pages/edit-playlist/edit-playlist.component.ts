import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { Playlist } from 'src/app/shared';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-edit-playlist',
	templateUrl: './edit-playlist.component.html',
	styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {
	playlist: Playlist;

	constructor(
		private route: ActivatedRoute,
		private playlistServ: PlaylistService,
		private translateServ: TranslateService,
		private snackBar: MatSnackBar
	) {}

	ngOnInit() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.playlistServ.getPlaylist(id).subscribe(playlist => (this.playlist = playlist));
	}

	updatePlaylist(playlist: Playlist) {
		this.playlistServ.updatePlaylist(playlist).subscribe(() => {
			this.translateServ.get('PLAYLIST.MSGS.SAVED').subscribe(res => {
				this.snackBar.open(res, undefined, { duration: 500 });
			});
		});
	}
}
