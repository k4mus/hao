import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StockProductoMySuffix } from './stock-producto-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StockProductoMySuffix>;

@Injectable()
export class StockProductoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/stock-productos';

    constructor(private http: HttpClient) { }

    create(stockProducto: StockProductoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(stockProducto);
        return this.http.post<StockProductoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stockProducto: StockProductoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(stockProducto);
        return this.http.put<StockProductoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StockProductoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StockProductoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockProductoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockProductoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StockProductoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StockProductoMySuffix[]>): HttpResponse<StockProductoMySuffix[]> {
        const jsonResponse: StockProductoMySuffix[] = res.body;
        const body: StockProductoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StockProductoMySuffix.
     */
    private convertItemFromServer(stockProducto: StockProductoMySuffix): StockProductoMySuffix {
        const copy: StockProductoMySuffix = Object.assign({}, stockProducto);
        return copy;
    }

    /**
     * Convert a StockProductoMySuffix to a JSON which can be sent to the server.
     */
    private convert(stockProducto: StockProductoMySuffix): StockProductoMySuffix {
        const copy: StockProductoMySuffix = Object.assign({}, stockProducto);
        return copy;
    }
}
