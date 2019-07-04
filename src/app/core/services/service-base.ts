import { environment } from 'src/environments/environment';

import { HttpHeaders } from '@angular/common/http';

export class ServiceBase {
	protected apiUrl = environment.api.baseUrl;

	protected httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(apiPath: string) {
		this.apiUrl += apiPath;
	}
}
