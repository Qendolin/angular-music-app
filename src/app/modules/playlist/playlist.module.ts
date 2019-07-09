import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SongListModule } from 'src/app/shared/components/song-list/song-list.module';
import { PlaylistBrowserComponent } from './pages/playlist-browser/playlist-browser.component';
import { NewPlaylistComponent } from './pages/new-playlist/new-playlist.component';
import { PlaylistFormComponent } from './components/playlist-form/playlist-form.component';
import { EditPlaylistComponent } from './pages/edit-playlist/edit-playlist.component';
import { SongPlayerModule } from 'src/app/shared/components/song-player/song-player.module';
import { PlayPlaylistComponent } from './pages/play-playlist/play-playlist.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: PlaylistBrowserComponent },
			{ path: 'new', component: NewPlaylistComponent },
			{ path: ':id', component: PlayPlaylistComponent },
			{ path: ':id/edit', component: EditPlaylistComponent }
		]),
		SharedModule,
		MaterialModule,
		SongListModule,
		SongPlayerModule
	],
	declarations: [
		PlaylistBrowserComponent,
		NewPlaylistComponent,
		PlaylistFormComponent,
		EditPlaylistComponent,
		PlayPlaylistComponent
	]
})
export class PlaylistModule {}
