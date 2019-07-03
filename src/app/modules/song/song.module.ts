import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewSongComponent } from './pages/new-song/new-song.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [
		RouterModule.forChild([{ path: 'new', component: NewSongComponent }]),
		CommonModule,
		FormsModule,
		SharedModule
	],
	declarations: [NewSongComponent]
})
export class SongModule {}
