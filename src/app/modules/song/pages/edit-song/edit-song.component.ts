import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/core/services';
import { Song } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-edit-song',
	templateUrl: './edit-song.component.html',
	styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
	song: Song = null;
	constructor(
		private songServ: SongsService,
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private translateServ: TranslateService
	) {}

	ngOnInit() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.songServ.getSong(id).subscribe(song => (this.song = song));
	}

	updateSong(song: Song) {
		this.songServ.updateSong(song).subscribe(() => {
			this.translateServ.get('SONG.MSGS.SAVED').subscribe(res => {
				this.snackBar.open(res, undefined, { duration: 500 });
			});
		});
	}

	deleteSong() {
		this.songServ.deleteSong(this.song.id).subscribe(() => {
			this.router.navigateByUrl('/songs');
		});
	}
}
