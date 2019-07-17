import { NgModule } from '@angular/core';
import { PlaylistSelectorDialogComponent } from './playlist-selector.component';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
	imports: [SharedModule, MaterialModule],
	exports: [PlaylistSelectorDialogComponent],
	declarations: [PlaylistSelectorDialogComponent],
	entryComponents: [PlaylistSelectorDialogComponent]
})
export class PlaylistSelectorModule {}
