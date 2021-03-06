import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewSongComponent } from './pages/new-song/new-song.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SongBrowserComponent } from './pages/song-browser/song-browser.component';
import { SongFormComponent } from './components';
import { TitleCasePipe } from '@angular/common';
import { EditSongComponent } from './pages/edit-song/edit-song.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SongListModule } from 'src/app/shared/components/song-list/song-list.module';
import { PlaySongComponent } from './pages/play-song/play-song.component';
import { PlaylistSelectorModule } from 'src/app/shared/components/playlist-selector/playlist-selector.module';
import { SongPlayerModule } from 'src/app/shared/components/song-player/song-player.module';

@NgModule({
  imports: [
	RouterModule.forChild([
		{ path: '', component: SongBrowserComponent },
		{ path: 'new', component: NewSongComponent },
		{ path: ':id', component: PlaySongComponent },
		{ path: ':id/edit', component: EditSongComponent }
	]),
	SharedModule,
	MaterialModule,
	SongListModule,
	PlaylistSelectorModule,
	SongPlayerModule
  ],
  declarations: [
	SongBrowserComponent,
	NewSongComponent,
	SongFormComponent,
	EditSongComponent,
	PlaySongComponent
  ],
  exports: [],
  providers: [TitleCasePipe]
})
export class SongModule {}
