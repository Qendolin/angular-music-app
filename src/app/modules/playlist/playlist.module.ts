import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SongListModule } from 'src/app/shared/components/song-list/song-list.module';
import { PlaylistBrowserComponent } from './pages/playlist-browser/playlist-browser.component';
import { NewPlaylistComponent } from './pages/new-playlist/new-playlist.component';
import { PlaylistFormComponent } from './components/playlist-form/playlist-form.component';
import { EditPlaylistComponent } from './pages/edit-playlist/edit-playlist.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: PlaylistBrowserComponent },
			{ path: 'new', component: NewPlaylistComponent },
			{ path: ':id', component: EditPlaylistComponent }
		]),
		SharedModule,
		MaterialModule,
		SongListModule
	],
	declarations: [
		PlaylistBrowserComponent,
		NewPlaylistComponent,
		PlaylistFormComponent,
		EditPlaylistComponent
	]
})
export class PlaylistModule {}
