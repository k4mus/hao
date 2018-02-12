import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VehiculoMySuffix } from './vehiculo-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VehiculoMySuffix>;

@Injectable()
export class VehiculoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/vehiculos';

    constructor(private http: HttpClient) { }

    create(vehiculo: VehiculoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(vehiculo);
        return this.http.post<VehiculoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehiculo: VehiculoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(vehiculo);
        return this.http.put<VehiculoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VehiculoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VehiculoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<VehiculoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VehiculoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VehiculoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VehiculoMySuffix[]>): HttpResponse<VehiculoMySuffix[]> {
        const jsonResponse: VehiculoMySuffix[] = res.body;
        const body: VehiculoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VehiculoMySuffix.
     */
    private convertItemFromServer(vehiculo: VehiculoMySuffix): VehiculoMySuffix {
        const copy: VehiculoMySuffix = Object.assign({}, vehiculo);
        return copy;
    }

    /**
     * Convert a VehiculoMySuffix to a JSON which can be sent to the server.
     */
    private convert(vehiculo: VehiculoMySuffix): VehiculoMySuffix {
        const copy: VehiculoMySuffix = Object.assign({}, vehiculo);
        return copy;
    }
}
