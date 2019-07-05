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

	searchGenres(name: string): Observable<Genre[]> {
		const params = new HttpParams().set('name', name);
		return this.http
			.get<Genre[]>(this.apiUrl, {
				...this.httpOptions,
				params: params
			})
			.pipe(catchError(handleError('getGenres', [])));
	}
}
