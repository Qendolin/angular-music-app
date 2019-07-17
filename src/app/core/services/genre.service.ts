import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServiceBase } from './service-base';
import { catchError } from 'rxjs/operators';
import { handleError } from './http-error';

@Injectable({
	providedIn: 'root'
})
export class GenreService extends ServiceBase {
	constructor(private http: HttpClient) {
		super('/genres');
	}

	getGenres(): Observable<Genre[]> {
		return this.http
			.get<Genre[]>(this.apiUrl, this.httpOptions)
			.pipe(catchError(handleError('getGenres', [])));
	}

	getGenre(id: number): Observable<Genre> {
		return this.http
			.get<Genre>(`${this.apiUrl}/${id}`, this.httpOptions)
			.pipe(catchError(handleError('getGenre', null)));
	}

	searchGenres(name: string): Observable<Genre[]> {
		const params = new HttpParams().set('name', name);
		return this.http
			.get<Genre[]>(this.apiUrl, {
				...this.httpOptions,
				params
			})
			.pipe(catchError(handleError('searchGenres', [])));
	}

	updateGenre(genre: Genre): Observable<void> {
		return this.http
			.put<Genre>(`${this.apiUrl}/${genre.id}`, genre, this.httpOptions)
			.pipe(catchError(handleError('updateGenre', null)));
	}

	deleteGenre(id: number): Observable<Genre> {
		return this.http
			.delete(`${this.apiUrl}/${id}`, this.httpOptions)
			.pipe(catchError(handleError('deleteGenre', null)));
	}
}
