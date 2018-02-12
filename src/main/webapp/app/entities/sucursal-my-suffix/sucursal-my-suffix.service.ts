import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SucursalMySuffix } from './sucursal-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SucursalMySuffix>;

@Injectable()
export class SucursalMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/sucursals';

    constructor(private http: HttpClient) { }

    create(sucursal: SucursalMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(sucursal);
        return this.http.post<SucursalMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sucursal: SucursalMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(sucursal);
        return this.http.put<SucursalMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SucursalMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SucursalMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SucursalMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SucursalMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SucursalMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SucursalMySuffix[]>): HttpResponse<SucursalMySuffix[]> {
        const jsonResponse: SucursalMySuffix[] = res.body;
        const body: SucursalMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SucursalMySuffix.
     */
    private convertItemFromServer(sucursal: SucursalMySuffix): SucursalMySuffix {
        const copy: SucursalMySuffix = Object.assign({}, sucursal);
        return copy;
    }

    /**
     * Convert a SucursalMySuffix to a JSON which can be sent to the server.
     */
    private convert(sucursal: SucursalMySuffix): SucursalMySuffix {
        const copy: SucursalMySuffix = Object.assign({}, sucursal);
        return copy;
    }
}
