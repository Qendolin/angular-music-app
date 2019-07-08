import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SongListComponent } from './components';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

@NgModule({
	exports: [CommonModule, FormsModule, TranslateModule, ReactiveFormsModule],
	declarations: []
})
export class SharedModule {}
