import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';
import { SongPlayerComponent } from './song-player.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [SharedModule, MaterialModule, RouterModule],
	exports: [SongPlayerComponent],
	declarations: [SongPlayerComponent],
	entryComponents: [SongPlayerComponent]
})
export class SongPlayerModule {}
