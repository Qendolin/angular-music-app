import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{ path: 'songs', loadChildren: () => import('./modules/song').then(m => m.SongModule) },
	{ path: 'genres', loadChildren: () => import('./modules/genre').then(m => m.GenreModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
