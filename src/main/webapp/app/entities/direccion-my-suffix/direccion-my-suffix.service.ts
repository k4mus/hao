import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DireccionMySuffix } from './direccion-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DireccionMySuffix>;

@Injectable()
export class DireccionMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/direccions';

    constructor(private http: HttpClient) { }

    create(direccion: DireccionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(direccion);
        return this.http.post<DireccionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(direccion: DireccionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(direccion);
        return this.http.put<DireccionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DireccionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DireccionMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DireccionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DireccionMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DireccionMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DireccionMySuffix[]>): HttpResponse<DireccionMySuffix[]> {
        const jsonResponse: DireccionMySuffix[] = res.body;
        const body: DireccionMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DireccionMySuffix.
     */
    private convertItemFromServer(direccion: DireccionMySuffix): DireccionMySuffix {
        const copy: DireccionMySuffix = Object.assign({}, direccion);
        return copy;
    }

    /**
     * Convert a DireccionMySuffix to a JSON which can be sent to the server.
     */
    private convert(direccion: DireccionMySuffix): DireccionMySuffix {
        const copy: DireccionMySuffix = Object.assign({}, direccion);
        return copy;
    }
}
