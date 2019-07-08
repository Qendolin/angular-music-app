import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';
import { SongListComponent } from './song-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [SharedModule, MaterialModule, RouterModule],
	exports: [SongListComponent],
	declarations: [SongListComponent]
})
export class SongListModule {}
