import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	exports: [
		MatChipsModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		MatIconModule,
		MatCheckboxModule,
		MatButtonModule,
		MatSnackBarModule,
		MatListModule,
		MatInputModule
	]
})
export class MaterialModule {}
