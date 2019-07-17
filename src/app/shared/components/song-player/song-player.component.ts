import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/shared';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistSelectorDialogComponent } from '..';

export enum PlayerState {
	PAUSED,
	PLAYING,
	FINISHED,
	LOADING,
	STALLED
}

@Component({
	selector: 'app-song-player',
	templateUrl: './song-player.component.html',
	styleUrls: ['./song-player.component.css']
})
export class SongPlayerComponent implements OnInit {
	@Input() song: Song;
	@Output() stateChanged: EventEmitter<PlayerState> = new EventEmitter();

	constructor(private dialog: MatDialog) {}

	ngOnInit() {
		this.emitStateChange(PlayerState.LOADING + '');
	}

	emitStateChange(state: string) {
		const newState = PlayerState[state];
		this.stateChanged.emit(newState);
	}

	showPlaylistDialog() {
		const dialogRef = this.dialog.open(PlaylistSelectorDialogComponent, { data: this.song });
		dialogRef.afterClosed().subscribe(song => {
			if (!song) {
				return;
			}
			this.song = song;
		});
	}
}
