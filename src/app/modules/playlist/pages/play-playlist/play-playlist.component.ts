import { Component, OnInit } from '@angular/core';
import { Song, Playlist } from 'src/app/shared';
import { PlayerState } from 'src/app/shared/components/song-player/song-player.component';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from 'src/app/core/services/playlist.service';

@Component({
	selector: 'app-play-playlist',
	templateUrl: './play-playlist.component.html',
	styleUrls: ['./play-playlist.component.css']
})
export class PlayPlaylistComponent implements OnInit {
	currentSong: Song;
	currentSongIndex = 0;
	playlist: Playlist;
	constructor(private route: ActivatedRoute, private playlistServ: PlaylistService) {}

	ngOnInit() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.playlistServ.getPlaylist(id).subscribe(pl => {
			this.playlist = pl;
			this.resume();
		});
	}

	playNextSong() {
		this.currentSongIndex++;
		this.currentSongIndex %= this.playlist.songs.length;
		this.resume();
	}

	resume() {
		this.currentSong = this.playlist.songs[this.currentSongIndex];
	}

	playPrevSong() {
		this.currentSongIndex--;
		if (this.currentSongIndex < 0) this.currentSongIndex = this.playlist.songs.length - 1;
		this.resume();
	}

	onPlayerStateChanged(state: PlayerState) {
		if (state == PlayerState.FINISHED) {
			this.playNextSong();
		}
	}
}
