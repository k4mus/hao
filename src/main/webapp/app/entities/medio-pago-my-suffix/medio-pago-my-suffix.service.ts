import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MedioPagoMySuffix } from './medio-pago-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MedioPagoMySuffix>;

@Injectable()
export class MedioPagoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/medio-pagos';

    constructor(private http: HttpClient) { }

    create(medioPago: MedioPagoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(medioPago);
        return this.http.post<MedioPagoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(medioPago: MedioPagoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(medioPago);
        return this.http.put<MedioPagoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MedioPagoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MedioPagoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MedioPagoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MedioPagoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MedioPagoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MedioPagoMySuffix[]>): HttpResponse<MedioPagoMySuffix[]> {
        const jsonResponse: MedioPagoMySuffix[] = res.body;
        const body: MedioPagoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MedioPagoMySuffix.
     */
    private convertItemFromServer(medioPago: MedioPagoMySuffix): MedioPagoMySuffix {
        const copy: MedioPagoMySuffix = Object.assign({}, medioPago);
        return copy;
    }

    /**
     * Convert a MedioPagoMySuffix to a JSON which can be sent to the server.
     */
    private convert(medioPago: MedioPagoMySuffix): MedioPagoMySuffix {
        const copy: MedioPagoMySuffix = Object.assign({}, medioPago);
        return copy;
    }
}
