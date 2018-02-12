import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MercadoMySuffix } from './mercado-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MercadoMySuffix>;

@Injectable()
export class MercadoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/mercados';

    constructor(private http: HttpClient) { }

    create(mercado: MercadoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(mercado);
        return this.http.post<MercadoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mercado: MercadoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(mercado);
        return this.http.put<MercadoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MercadoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MercadoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MercadoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MercadoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MercadoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MercadoMySuffix[]>): HttpResponse<MercadoMySuffix[]> {
        const jsonResponse: MercadoMySuffix[] = res.body;
        const body: MercadoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MercadoMySuffix.
     */
    private convertItemFromServer(mercado: MercadoMySuffix): MercadoMySuffix {
        const copy: MercadoMySuffix = Object.assign({}, mercado);
        return copy;
    }

    /**
     * Convert a MercadoMySuffix to a JSON which can be sent to the server.
     */
    private convert(mercado: MercadoMySuffix): MercadoMySuffix {
        const copy: MercadoMySuffix = Object.assign({}, mercado);
        return copy;
    }
}
