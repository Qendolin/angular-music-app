import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song, Playlist } from 'src/app/shared';
import { SongsService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistSelectorDialog } from 'src/app/shared/components';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-play-song',
	templateUrl: './play-song.component.html',
	styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {
	song: Song;

	constructor(
		private route: ActivatedRoute,
		private songServ: SongsService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.songServ.getSong(id).subscribe(song => (this.song = song));
	}

	showPlaylistDialog() {
		const dialogRef = this.dialog.open(PlaylistSelectorDialog, { data: this.song });
		dialogRef.afterClosed().subscribe(song => {
			if (!song) return;
			this.song = song;
		});
	}
}
