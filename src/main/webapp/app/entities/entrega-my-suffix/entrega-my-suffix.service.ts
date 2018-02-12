import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EntregaMySuffix } from './entrega-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EntregaMySuffix>;

@Injectable()
export class EntregaMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/entregas';

    constructor(private http: HttpClient) { }

    create(entrega: EntregaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(entrega);
        return this.http.post<EntregaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(entrega: EntregaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(entrega);
        return this.http.put<EntregaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EntregaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EntregaMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EntregaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EntregaMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EntregaMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EntregaMySuffix[]>): HttpResponse<EntregaMySuffix[]> {
        const jsonResponse: EntregaMySuffix[] = res.body;
        const body: EntregaMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EntregaMySuffix.
     */
    private convertItemFromServer(entrega: EntregaMySuffix): EntregaMySuffix {
        const copy: EntregaMySuffix = Object.assign({}, entrega);
        return copy;
    }

    /**
     * Convert a EntregaMySuffix to a JSON which can be sent to the server.
     */
    private convert(entrega: EntregaMySuffix): EntregaMySuffix {
        const copy: EntregaMySuffix = Object.assign({}, entrega);
        return copy;
    }
}
