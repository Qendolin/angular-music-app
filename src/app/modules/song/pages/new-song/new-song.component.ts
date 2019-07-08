import { Component } from '@angular/core';
import { Song } from 'src/app/shared';
import { take } from 'rxjs/operators';
import { SongsService } from 'src/app/core/services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-new-song',
	templateUrl: './new-song.component.html',
	styleUrls: ['./new-song.component.css']
})
export class NewSongComponent {
	constructor(private songServ: SongsService, private router: Router) {}

	addSong(song: Song) {
		this.songServ.addSong(song).subscribe(() => {
			this.router.navigateByUrl('/songs');
		});
	}
}
