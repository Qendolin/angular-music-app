import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewSongComponent } from './pages/new-song/new-song.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SongBrowserComponent } from './pages/song-browser/song-browser.component';
import { SongListComponent } from './components';
import { TagInputModule } from 'ngx-chips';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: SongBrowserComponent },
			{ path: 'new', component: NewSongComponent }
		]),
		SharedModule,
		TagInputModule
	],
	declarations: [SongBrowserComponent, SongListComponent, NewSongComponent]
})
export class SongModule {}
