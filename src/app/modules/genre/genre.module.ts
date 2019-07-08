import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenreBrowserComponent, EditGenreComponent } from './pages';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SongModule } from '../song';
import { SongListModule } from 'src/app/shared/components/song-list/song-list.module';

@NgModule({
	imports: [
		MaterialModule,
		SharedModule,
		RouterModule.forChild([
			{ path: '', component: GenreBrowserComponent },
			{ path: ':id/edit', component: EditGenreComponent }
		]),
		SongListModule
	],
	declarations: [GenreBrowserComponent, EditGenreComponent]
})
export class GenreModule {}
