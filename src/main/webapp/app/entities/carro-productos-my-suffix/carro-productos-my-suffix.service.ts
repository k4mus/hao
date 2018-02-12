import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CarroProductosMySuffix } from './carro-productos-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CarroProductosMySuffix>;

@Injectable()
export class CarroProductosMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/carro-productos';

    constructor(private http: HttpClient) { }

    create(carroProductos: CarroProductosMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(carroProductos);
        return this.http.post<CarroProductosMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carroProductos: CarroProductosMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(carroProductos);
        return this.http.put<CarroProductosMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarroProductosMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CarroProductosMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarroProductosMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CarroProductosMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarroProductosMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarroProductosMySuffix[]>): HttpResponse<CarroProductosMySuffix[]> {
        const jsonResponse: CarroProductosMySuffix[] = res.body;
        const body: CarroProductosMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarroProductosMySuffix.
     */
    private convertItemFromServer(carroProductos: CarroProductosMySuffix): CarroProductosMySuffix {
        const copy: CarroProductosMySuffix = Object.assign({}, carroProductos);
        return copy;
    }

    /**
     * Convert a CarroProductosMySuffix to a JSON which can be sent to the server.
     */
    private convert(carroProductos: CarroProductosMySuffix): CarroProductosMySuffix {
        const copy: CarroProductosMySuffix = Object.assign({}, carroProductos);
        return copy;
    }
}
