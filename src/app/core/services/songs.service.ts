import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from 'src/app/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from './http-error';

const API_URL = environment.api.baseUrl + '/songs';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class SongsService {
	constructor(private http: HttpClient) {}

	getSongs(): Observable<Song[]> {
		return this.http
			.get<Song[]>(API_URL, httpOptions)
			.pipe(catchError(handleError('getSongs', [])));
	}

	addSong(song: Song): Observable<Song> {
		return this.http
			.post<Song>(API_URL, song, httpOptions)
			.pipe(catchError(handleError('addSong', null)));
	}
}
