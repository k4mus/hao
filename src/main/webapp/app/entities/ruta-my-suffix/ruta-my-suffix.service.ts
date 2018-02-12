import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RutaMySuffix } from './ruta-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RutaMySuffix>;

@Injectable()
export class RutaMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/rutas';

    constructor(private http: HttpClient) { }

    create(ruta: RutaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ruta);
        return this.http.post<RutaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ruta: RutaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ruta);
        return this.http.put<RutaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RutaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RutaMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RutaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RutaMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RutaMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RutaMySuffix[]>): HttpResponse<RutaMySuffix[]> {
        const jsonResponse: RutaMySuffix[] = res.body;
        const body: RutaMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RutaMySuffix.
     */
    private convertItemFromServer(ruta: RutaMySuffix): RutaMySuffix {
        const copy: RutaMySuffix = Object.assign({}, ruta);
        return copy;
    }

    /**
     * Convert a RutaMySuffix to a JSON which can be sent to the server.
     */
    private convert(ruta: RutaMySuffix): RutaMySuffix {
        const copy: RutaMySuffix = Object.assign({}, ruta);
        return copy;
    }
}
