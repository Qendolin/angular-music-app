import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { Observable } from 'rxjs';
import { Playlist } from '../models';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleError } from './http-error';

@Injectable({
	providedIn: 'root'
})
export class PlaylistService extends ServiceBase {
	constructor(private http: HttpClient) {
		super('/playlists');
	}

	getPlaylist(id: number): Observable<Playlist> {
		return this.http
			.get<Playlist>(`${this.apiUrl}/${id}`, this.httpOptions)
			.pipe(catchError(handleError('getPlaylist', null)));
	}

	getPlaylists(): Observable<Playlist[]> {
		return this.http
			.get<Playlist[]>(this.apiUrl, this.httpOptions)
			.pipe(catchError(handleError('getPlaylists', null)));
	}

	updatePlaylist(playlist: Playlist): Observable<void> {
		return this.http
			.put<Playlist>(`${this.apiUrl}/${playlist.id}`, playlist, this.httpOptions)
			.pipe(catchError(handleError('updatePlaylist', null)));
	}

	addPlaylist(playlist: Playlist): Observable<Playlist> {
		return this.http
			.post<Playlist>(`${this.apiUrl}`, playlist, this.httpOptions)
			.pipe(catchError(handleError('addPlaylist', null)));
	}
}
