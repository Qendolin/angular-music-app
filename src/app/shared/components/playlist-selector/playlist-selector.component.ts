import {
	Component,
	OnInit,
	Inject,
	ViewChild,
	SimpleChanges,
	ViewChildren,
	QueryList,
	AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { Playlist, Song } from 'src/app/core/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { SongsService } from 'src/app/core/services';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-playlist-selector',
	templateUrl: './playlist-selector.component.html',
	styleUrls: ['./playlist-selector.component.css']
})
export class PlaylistSelectorDialog implements AfterViewInit {
	playlists$: Observable<Playlist[]>;
	@ViewChild('selectedLists', { static: false }) selectedLists: MatSelectionList;
	@ViewChildren('listOptions') listOptions: QueryList<any>;
	constructor(
		playlistServ: PlaylistService,
		private songServ: SongsService,
		private dialogRef: MatDialogRef<PlaylistSelectorDialog>,
		@Inject(MAT_DIALOG_DATA) private song: Song
	) {
		this.playlists$ = playlistServ.getPlaylists();
	}

	ngAfterViewInit() {
		this.listOptions.changes.pipe(delay(0)).subscribe(() => {
			if (!this.song.playlists) return;
			const selectedListOptions = this.selectedLists.options.filter(
				opt => this.song.playlists.find(pl => pl.id == opt.value) != null
			);
			this.selectedLists.selectedOptions.select(...selectedListOptions);
		});
	}

	cancel() {
		this.dialogRef.close(this.song);
	}

	submit() {
		const selectedPlIds = this.selectedLists.selectedOptions.selected.map(opt => opt.value);
		this.playlists$.subscribe(playlists => {
			this.song.playlists = selectedPlIds.map(id => playlists.find(pl => pl.id == id));
			this.songServ.updateSong(this.song).subscribe();
			this.dialogRef.close(this.song);
		});
	}
}
