import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author, Song } from 'src/app/shared';
import { catchError } from 'rxjs/operators';
import { handleError } from './http-error';
import { ServiceBase } from './service-base';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthorService extends ServiceBase {
	constructor(private http: HttpClient) {
		super('/authors');
	}

	getAuthors(): Observable<Author[]> {
		return this.http
			.get<Song[]>(this.apiUrl, this.httpOptions)
			.pipe(catchError(handleError('getAuthors', [])));
	}

	addAuthor(author: Author): Observable<Author> {
		return this.http
			.post<Song>(this.apiUrl, author, this.httpOptions)
			.pipe(catchError(handleError('addAuthor', null)));
	}
}
