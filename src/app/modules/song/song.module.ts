import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewSongComponent } from './pages/new-song/new-song.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SongBrowserComponent } from './pages/song-browser/song-browser.component';
import { SongListComponent } from './components/song-list/song-list.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: SongBrowserComponent },
			{ path: 'new', component: NewSongComponent }
		]),
		CommonModule,
		FormsModule,
		SharedModule,
		ReactiveFormsModule
	],
	declarations: [SongBrowserComponent, SongListComponent, NewSongComponent]
})
export class SongModule {}
