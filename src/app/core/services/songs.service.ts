import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from 'src/app/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from './http-error';
import { ServiceBase } from './service-base';

@Injectable({
	providedIn: 'root'
})
export class SongsService extends ServiceBase {
	constructor(private http: HttpClient) {
		super('/songs');
	}

	getSongs(): Observable<Song[]> {
		return this.http
			.get<Song[]>(this.apiUrl, this.httpOptions)
			.pipe(catchError(handleError('getSongs', [])));
	}

	getSong(id: string): Observable<Song> {
		return this.http
			.get(`${this.apiUrl}/${id}`, this.httpOptions)
			.pipe(catchError(handleError('getSong', null)));
	}

	addSong(song: Song): Observable<Song> {
		return this.http
			.post<Song>(this.apiUrl, song, this.httpOptions)
			.pipe(catchError(handleError('addSong', null)));
	}

	updateSong(song: Song): Observable<void> {
		return this.http
			.put<Song>(`${this.apiUrl}/${song.id}`, song, this.httpOptions)
			.pipe(catchError(handleError('updateSong', null)));
	}

	deleteSong(id: number): Observable<Song> {
		return this.http
			.delete<Song>(`${this.apiUrl}/${id}`, this.httpOptions)
			.pipe(catchError(handleError('updateSong', null)));
	}
}
