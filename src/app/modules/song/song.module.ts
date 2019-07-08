import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewSongComponent } from './pages/new-song/new-song.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SongBrowserComponent } from './pages/song-browser/song-browser.component';
import { SongListComponent, SongFormComponent } from './components';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { EditSongComponent } from './pages/edit-song/edit-song.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: SongBrowserComponent },
			{ path: 'new', component: NewSongComponent },
			{ path: ':id/edit', component: EditSongComponent }
		]),
		SharedModule,
		MatChipsModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		MatIconModule,
		MatCheckboxModule
	],
	declarations: [
		SongBrowserComponent,
		SongListComponent,
		NewSongComponent,
		SongFormComponent,
		EditSongComponent
	],
	providers: [TitleCasePipe]
})
export class SongModule {}
