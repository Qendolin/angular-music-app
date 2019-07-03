import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, Song } from 'src/app/shared';
import { catchError } from 'rxjs/operators';
import { handleError } from './http-error';

const API_URL = environment.api.baseUrl + '/authors';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class AuthorService {
	constructor(private http: HttpClient) {}

	getAuthors(): Observable<Author[]> {
		return this.http
			.get<Song[]>(API_URL, httpOptions)
			.pipe(catchError(handleError('getAuthors', [])));
	}

	addAuthor(author: Author): Observable<Author> {
		return this.http
			.post<Song>(API_URL, author, httpOptions)
			.pipe(catchError(handleError('addAuthor', null)));
	}
}
