import { NgModule } from '@angular/core';
import { PlaylistSelectorDialog } from './playlist-selector.component';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
	imports: [SharedModule, MaterialModule],
	exports: [PlaylistSelectorDialog],
	declarations: [PlaylistSelectorDialog],
	entryComponents: [PlaylistSelectorDialog]
})
export class PlaylistSelectorModule {}
