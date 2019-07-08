import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from 'src/app/core/services';
import { Song } from 'src/app/shared';

@Component({
	selector: 'app-play-song',
	templateUrl: './play-song.component.html',
	styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {
	song: Song;

	constructor(private route: ActivatedRoute, private songServ: SongsService) {}

	ngOnInit() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.songServ.getSong(id).subscribe(song => (this.song = song));
	}
}
