import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ComercioMySuffix } from './comercio-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComercioMySuffix>;

@Injectable()
export class ComercioMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/comercios';

    constructor(private http: HttpClient) { }

    create(comercio: ComercioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(comercio);
        return this.http.post<ComercioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comercio: ComercioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(comercio);
        return this.http.put<ComercioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComercioMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComercioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComercioMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComercioMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComercioMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComercioMySuffix[]>): HttpResponse<ComercioMySuffix[]> {
        const jsonResponse: ComercioMySuffix[] = res.body;
        const body: ComercioMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComercioMySuffix.
     */
    private convertItemFromServer(comercio: ComercioMySuffix): ComercioMySuffix {
        const copy: ComercioMySuffix = Object.assign({}, comercio);
        return copy;
    }

    /**
     * Convert a ComercioMySuffix to a JSON which can be sent to the server.
     */
    private convert(comercio: ComercioMySuffix): ComercioMySuffix {
        const copy: ComercioMySuffix = Object.assign({}, comercio);
        return copy;
    }
}
