import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewSongComponent } from './pages/new-song/new-song.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SongBrowserComponent } from './pages/song-browser/song-browser.component';
import { SongListComponent } from './components';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: SongBrowserComponent },
			{ path: 'new', component: NewSongComponent }
		]),
		SharedModule,
		MatChipsModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		MatIconModule
	],
	declarations: [SongBrowserComponent, SongListComponent, NewSongComponent],
	providers: [TitleCasePipe]
})
export class SongModule {}
