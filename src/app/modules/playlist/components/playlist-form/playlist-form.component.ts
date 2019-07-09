import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Playlist } from 'src/app/shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-playlist-form',
	templateUrl: './playlist-form.component.html',
	styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent implements OnInit {
	@Input() playlist: Playlist;
	@Output('playlistChanged') playlistEmitter: EventEmitter<Playlist> = new EventEmitter();

	playlistFormGroup: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.playlist = this.playlist || <Playlist>{};
		this.playlistFormGroup = this.formBuilder.group({
			name: [this.playlist.name, [Validators.required]]
		});
	}

	emitPlaylist() {
		if (this.playlistFormGroup.invalid) return;
		this.playlist.name = this.playlistFormGroup.value.name;
		console.log('Emittint Playlist: ', this.playlist);
		this.playlistEmitter.emit(this.playlist);
	}

	removeSong(id: number) {
		const index = this.playlist.songs.findIndex(song => song.id == id);
		if (index == -1) return;
		this.playlist.songs.splice(index, 1);
	}
}
