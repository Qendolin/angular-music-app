import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/core/services';
import { Song } from 'src/app/shared';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-edit-song',
	templateUrl: './edit-song.component.html',
	styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
	song: Song = null;
	constructor(private songServ: SongsService, private route: ActivatedRoute) {}

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		this.songServ.getSong(id).subscribe(song => (this.song = song));
	}

	updateSong(song: Song) {
		this.songServ.updateSong(song).subscribe();
	}
}
