import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ListaEntregaMySuffix } from './lista-entrega-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ListaEntregaMySuffix>;

@Injectable()
export class ListaEntregaMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/lista-entregas';

    constructor(private http: HttpClient) { }

    create(listaEntrega: ListaEntregaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(listaEntrega);
        return this.http.post<ListaEntregaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(listaEntrega: ListaEntregaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(listaEntrega);
        return this.http.put<ListaEntregaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ListaEntregaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ListaEntregaMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ListaEntregaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ListaEntregaMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ListaEntregaMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ListaEntregaMySuffix[]>): HttpResponse<ListaEntregaMySuffix[]> {
        const jsonResponse: ListaEntregaMySuffix[] = res.body;
        const body: ListaEntregaMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ListaEntregaMySuffix.
     */
    private convertItemFromServer(listaEntrega: ListaEntregaMySuffix): ListaEntregaMySuffix {
        const copy: ListaEntregaMySuffix = Object.assign({}, listaEntrega);
        return copy;
    }

    /**
     * Convert a ListaEntregaMySuffix to a JSON which can be sent to the server.
     */
    private convert(listaEntrega: ListaEntregaMySuffix): ListaEntregaMySuffix {
        const copy: ListaEntregaMySuffix = Object.assign({}, listaEntrega);
        return copy;
    }
}
