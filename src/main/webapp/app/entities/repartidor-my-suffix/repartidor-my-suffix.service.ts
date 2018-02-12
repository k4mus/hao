import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RepartidorMySuffix } from './repartidor-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RepartidorMySuffix>;

@Injectable()
export class RepartidorMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/repartidors';

    constructor(private http: HttpClient) { }

    create(repartidor: RepartidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(repartidor);
        return this.http.post<RepartidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(repartidor: RepartidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(repartidor);
        return this.http.put<RepartidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RepartidorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RepartidorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RepartidorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RepartidorMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RepartidorMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RepartidorMySuffix[]>): HttpResponse<RepartidorMySuffix[]> {
        const jsonResponse: RepartidorMySuffix[] = res.body;
        const body: RepartidorMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RepartidorMySuffix.
     */
    private convertItemFromServer(repartidor: RepartidorMySuffix): RepartidorMySuffix {
        const copy: RepartidorMySuffix = Object.assign({}, repartidor);
        return copy;
    }

    /**
     * Convert a RepartidorMySuffix to a JSON which can be sent to the server.
     */
    private convert(repartidor: RepartidorMySuffix): RepartidorMySuffix {
        const copy: RepartidorMySuffix = Object.assign({}, repartidor);
        return copy;
    }
}
